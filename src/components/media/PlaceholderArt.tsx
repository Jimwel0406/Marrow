import type { ReactNode } from "react";

/* ------------------------------------------------------------------
   Placeholder photography.

   Every image slot on the homepage renders a purpose-built composition
   rather than a random stock filler: the geometry, crop and light are
   the ones the final photograph needs, so swapping in a real file later
   does not move a single element of the layout.

   To go live, pass `src` to <Photo /> — nothing else changes.
------------------------------------------------------------------ */

export type Tone = "overcast" | "dusk" | "night" | "studio";

type ToneSpec = {
  skyTop: string;
  skyMid: string;
  skyLow: string;
  haze: string;
  far: string;
  mid: string;
  near: string;
  figure: string;
  /** garments and bags sit a notch lighter so they read against the body */
  prop: string;
};

const TONES: Record<Tone, ToneSpec> = {
  overcast: {
    skyTop: "#93a0ad",
    skyMid: "#6d7c8a",
    skyLow: "#454e59",
    haze: "#bcc5ce",
    far: "#3d4651",
    mid: "#2a3138",
    near: "#131619",
    figure: "#08090b",
    prop: "#242a31",
  },
  dusk: {
    skyTop: "#54657a",
    skyMid: "#8f8378",
    skyLow: "#c0966c",
    haze: "#dcb68b",
    far: "#48413f",
    mid: "#2a2827",
    near: "#111011",
    figure: "#09090a",
    prop: "#22201f",
  },
  night: {
    skyTop: "#1c222a",
    skyMid: "#141920",
    skyLow: "#0d1015",
    haze: "#39424d",
    far: "#191e25",
    mid: "#111519",
    near: "#07090b",
    figure: "#040506",
    prop: "#181d24",
  },
  studio: {
    skyTop: "#e9e4db",
    skyMid: "#ddd7cd",
    skyLow: "#cec7bc",
    haze: "#f2ede5",
    far: "#c5beb3",
    mid: "#b6aea2",
    near: "#a2988b",
    figure: "#131417",
    prop: "#3a3f47",
  },
};

/* deterministic pseudo-random, so SSR and client agree */
function rng(seed: number) {
  let s = seed % 4294967296;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/* -- sky, haze and vignette: the cinematic base layer -- */
function Base({ id, tone }: { id: string; tone: Tone }) {
  const t = TONES[tone];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor={t.skyTop} />
          <stop offset="48%" stopColor={t.skyMid} />
          <stop offset="100%" stopColor={t.skyLow} />
        </linearGradient>
        <radialGradient id={`${id}-haze`} cx="0.66" cy="0.7" r="0.72">
          <stop offset="0%" stopColor={t.haze} stopOpacity="0.7" />
          <stop offset="100%" stopColor={t.haze} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-vig`} x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#040506" stopOpacity="0.6" />
          <stop offset="52%" stopColor="#040506" stopOpacity="0" />
          <stop offset="100%" stopColor="#040506" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id={`${id}-foot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#040506" stopOpacity="0" />
          <stop offset="100%" stopColor="#040506" stopOpacity="0.72" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-sky)`} />
      <rect width="100%" height="100%" fill={`url(#${id}-haze)`} />
    </>
  );
}

/* -- distant city blocks, low contrast, read as depth not detail -- */
function Skyline({
  id,
  tone,
  y,
  from,
  to,
  seed,
  opacity = 0.85,
  min = 40,
  max = 190,
  width = 46,
}: {
  id: string;
  tone: Tone;
  y: number;
  from: number;
  to: number;
  seed: number;
  opacity?: number;
  min?: number;
  max?: number;
  width?: number;
}) {
  const rand = rng(seed);
  const blocks: ReactNode[] = [];
  let x = from;
  let i = 0;
  while (x < to) {
    const w = width * (0.5 + rand() * 1.1);
    const h = min + rand() * (max - min);
    blocks.push(
      <rect
        key={`${id}-b${i}`}
        x={x}
        y={y - h}
        width={w}
        height={h}
        fill={i % 3 === 0 ? TONES[tone].far : TONES[tone].mid}
      />,
    );
    x += w + 6 + rand() * 16;
    i += 1;
  }
  return <g opacity={opacity}>{blocks}</g>;
}

/* ------------------------------------------------------------------
   Figures are built from round-capped capsules rather than single
   silhouettes — limbs stay separated, the neck reads, and the result
   looks like a person under a jacket instead of a blob.
------------------------------------------------------------------ */

/* -- standing figure, feet at y, optional backpack -- */
function Figure({
  x,
  y,
  h,
  tone,
  flip = false,
  pack = false,
  opacity = 1,
}: {
  x: number;
  y: number;
  h: number;
  tone: Tone;
  flip?: boolean;
  pack?: boolean;
  opacity?: number;
}) {
  const s = h / 98;
  const { figure: body, prop } = TONES[tone];

  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      opacity={opacity}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {pack && (
        <>
          <rect x="-16" y="-84" width="23" height="33" rx="8" fill={prop} stroke="none" />
          <path d="M-15 -82 L-15 -53" stroke={prop} strokeWidth="1.6" opacity="0.55" />
          <path d="M9 -84 L9 -78" stroke={prop} strokeWidth="3" />
        </>
      )}

      {/* legs and feet */}
      <path d="M-5 -44 L-6 -23 L-6 -3" stroke={body} strokeWidth="9" />
      <path d="M5 -44 L6 -23 L6 -3" stroke={body} strokeWidth="9" />
      <path d="M-6 -3 L-10 -2.5" stroke={body} strokeWidth="6" />
      <path d="M6 -3 L10 -2.5" stroke={body} strokeWidth="6" />

      {/* arms, held just clear of the torso so the silhouette separates */}
      <path d="M-10 -74 L-13.5 -58 L-13 -42" stroke={body} strokeWidth="7.5" />
      <path d="M10 -74 L13.5 -58 L13 -42" stroke={body} strokeWidth="7.5" />

      {/* shoulders squared off so the head and neck read as a head and neck */}
      <path d="M-12.5 -44 L-10 -76 C-6.5 -81 6.5 -81 10 -76 L12.5 -44 Z" fill={body} stroke="none" />
      <rect x="-3.8" y="-84" width="7.6" height="10" fill={body} stroke="none" />
      <circle cx="0" cy="-90" r="7.2" fill={body} stroke="none" />
    </g>
  );
}

/* -- seated figure, side on, knees up, feet on the ground -- */
function SeatedFigure({
  x,
  y,
  h,
  tone,
  flip = false,
  opacity = 1,
}: {
  x: number;
  y: number;
  h: number;
  tone: Tone;
  flip?: boolean;
  opacity?: number;
}) {
  const s = h / 96;
  const body = TONES[tone].figure;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      opacity={opacity}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* shin and foot */}
      <path d="M19 -36 L21 -7" stroke={body} strokeWidth="10" />
      <path d="M21 -6 L29 -6" stroke={body} strokeWidth="6" />

      {/* thigh forward, hips slightly rolled back */}
      <path d="M0 -33 L19 -36" stroke={body} strokeWidth="13" />

      {/* arm resting forward on the knee */}
      <path d="M1 -66 L5 -52 L16 -41" stroke={body} strokeWidth="7.5" />

      {/* back and shoulders */}
      <path d="M0 -30 L-1 -70" stroke={body} strokeWidth="20" />
      <rect x="-1" y="-84" width="7" height="10" fill={body} stroke="none" />
      <circle cx="3" cy="-87" r="7" fill={body} stroke="none" />
    </g>
  );
}

/* -- the art itself -------------------------------------------------- */

export type Shot =
  | "hero"
  | "campaign"
  | "story"
  | "drop"
  | "skyline-sit"
  | "tower"
  | "hooded-jacket"
  | "crewneck"
  | "cargo-pants"
  | "cap"
  | "cat-outerwear"
  | "cat-bottoms"
  | "cat-tops"
  | "cat-footwear"
  | "cat-accessories";

type Art = { viewBox: string; tone: Tone; render: (id: string) => ReactNode };

function garment(id: string, d: string, seam?: ReactNode) {
  return (
    <g>
      <path
        d={d}
        fill={`url(#${id}-garment)`}
        stroke={TONES.studio.near}
        strokeWidth="1.4"
      />
      {seam}
    </g>
  );
}

function GarmentDefs({ id, light }: { id: string; light: boolean }) {
  return (
    <defs>
      <linearGradient id={`${id}-garment`} x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stopColor={light ? "#f3efe7" : "#3a3e44"} />
        <stop offset="55%" stopColor={light ? "#e2dcd1" : "#26292e"} />
        <stop offset="100%" stopColor={light ? "#cdc6ba" : "#15171a"} />
      </linearGradient>
      <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000" stopOpacity="0.28" />
        <stop offset="42%" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-floor`} cx="0.5" cy="1" r="0.62">
        <stop offset="0%" stopColor="#8d857a" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#8d857a" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

export const SHOTS: Record<Shot, Art> = {
  /* 01 — hero: model in technical jacket + pack under a concrete overhang */
  hero: {
    viewBox: "0 0 1400 720",
    tone: "overcast",
    render: (id) => (
      <>
        <Base id={id} tone="overcast" />

        {/* distant skyline, settled on the horizon */}
        <Skyline id={id} tone="overcast" y={448} from={700} to={1420} seed={11} opacity={0.3} min={60} max={200} width={62} />

        {/* architectural overhang crossing the frame */}
        <path d="M0 0 L980 0 L470 208 L0 266 Z" fill="#0b0d10" opacity="0.96" />
        <path d="M0 266 L470 208 L473 226 L0 288 Z" fill="#252a31" opacity="0.85" />
        <path d="M980 0 L1400 0 L1400 94 L1012 70 Z" fill="#12161b" opacity="0.9" />
        <path d="M470 208 L1012 70 L1016 88 L473 226 Z" fill="#333b45" opacity="0.45" />

        {/* support columns deep in the frame */}
        <rect x="1148" y="122" width="24" height="330" fill="#171b21" opacity="0.8" />
        <rect x="1302" y="98" width="24" height="354" fill="#131720" opacity="0.75" />

        {/* ground plane, lighter than the subject so the silhouette reads */}
        <defs>
          <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#454d56" />
            <stop offset="55%" stopColor="#23282e" />
            <stop offset="100%" stopColor="#0c0f12" />
          </linearGradient>
        </defs>
        <rect x="0" y="446" width="1400" height="274" fill={`url(#${id}-ground)`} />
        <rect x="0" y="446" width="1400" height="2.5" fill="#9aa7b3" opacity="0.28" />

        <Figure x={890} y={650} h={392} tone="overcast" pack />
        <Figure x={1146} y={620} h={248} tone="overcast" opacity={0.55} flip />

        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
        <rect x="0" y="430" width="1400" height="290" fill={`url(#${id}-foot)`} opacity="0.6" />
      </>
    ),
  },

  /* 02 — campaign: two models walking the waterfront at dusk */
  campaign: {
    viewBox: "0 0 1400 560",
    tone: "dusk",
    render: (id) => (
      <>
        <Base id={id} tone="dusk" />
        <Skyline id={id} tone="dusk" y={352} from={700} to={1420} seed={29} opacity={0.92} min={70} max={240} width={54} />
        <Skyline id={id} tone="dusk" y={366} from={980} to={1400} seed={7} opacity={0.5} min={40} max={120} width={34} />

        {/* water + reflection */}
        <rect x="0" y="352" width="1400" height="208" fill="#2c2f36" />
        <rect x="0" y="352" width="1400" height="208" fill={TONES.dusk.haze} opacity="0.14" />
        <g opacity="0.22">
          <rect x="880" y="356" width="10" height="46" fill={TONES.dusk.skyLow} />
          <rect x="1010" y="356" width="14" height="62" fill={TONES.dusk.skyLow} />
          <rect x="1180" y="356" width="8" height="38" fill={TONES.dusk.skyLow} />
        </g>

        {/* promenade + railing */}
        <rect x="0" y="452" width="1400" height="108" fill={TONES.dusk.near} />
        <rect x="0" y="440" width="1400" height="10" fill="#1d1c1d" />
        <rect x="0" y="404" width="1400" height="5" fill="#22211f" opacity="0.85" />
        <g stroke="#22211f" strokeWidth="4" opacity="0.8">
          <path d="M300 409 L300 452 M470 409 L470 452 M640 409 L640 452 M810 409 L810 452 M980 409 L980 452 M1150 409 L1150 452" />
        </g>

        <Figure x={610} y={468} h={252} tone="dusk" />
        <Figure x={830} y={452} h={214} tone="dusk" flip />

        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },

  /* 03 — brand story: candid figure resting against a concrete facade */
  story: {
    viewBox: "0 0 1200 900",
    tone: "overcast",
    render: (id) => (
      <>
        <Base id={id} tone="overcast" />
        {/* raw concrete facade, kept dark so the figure carries the frame */}
        <rect x="0" y="0" width="1200" height="900" fill="#63625f" opacity="0.75" />
        <g stroke="#43423f" strokeWidth="2" opacity="0.6">
          <path d="M120 0 L120 900 M420 0 L420 900 M720 0 L720 900 M1020 0 L1020 900" />
          <path d="M0 140 L1200 140 M0 420 L1200 420 M0 700 L1200 700" />
        </g>
        <rect x="0" y="0" width="1200" height="900" fill="#2b2f34" opacity="0.35" />
        <rect x="0" y="640" width="1200" height="260" fill={TONES.overcast.near} />
        <rect x="0" y="612" width="1200" height="30" fill="#33353a" />

        <SeatedFigure x={476} y={690} h={418} tone="overcast" />

        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
        <rect x="0" y="560" width="1200" height="340" fill={`url(#${id}-foot)`} opacity="0.8" />
      </>
    ),
  },

  /* 04 — winter drop: garment close-up with a back graphic */
  drop: {
    viewBox: "0 0 1400 460",
    tone: "night",
    render: (id) => (
      <>
        <Base id={id} tone="night" />
        <rect x="0" y="0" width="1400" height="460" fill="#0d1014" opacity="0.45" />
        <g stroke="#252a31" strokeWidth="2" opacity="0.6">
          <path d="M960 0 L960 460 M1120 0 L1120 460 M1280 0 L1280 460" />
          <path d="M920 100 L1400 100 M920 260 L1400 260" />
        </g>

        <defs>
          <linearGradient id={`${id}-cloth`} x1="0.12" y1="0" x2="0.88" y2="1">
            <stop offset="0%" stopColor="#525b66" />
            <stop offset="34%" stopColor="#2b3138" />
            <stop offset="100%" stopColor="#11151a" />
          </linearGradient>
          <radialGradient id={`${id}-sheen`} cx="0.38" cy="0.18" r="0.62">
            <stop offset="0%" stopColor="#a3aeb9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a3aeb9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Garment, cropped so shoulders and hem run out of frame */}
        <path
          d="M250 470 L250 -26 C250 -62 332 -82 474 -88 L926 -88 C1068 -82 1150 -62 1150 -26 L1150 470 Z"
          fill={`url(#${id}-cloth)`}
        />
        <path
          d="M250 470 L250 -26 C250 -62 332 -82 474 -88 L926 -88 C1068 -82 1150 -62 1150 -26 L1150 470 Z"
          fill={`url(#${id}-sheen)`}
        />

        {/* yoke, centre seam and ribbed hem */}
        <path
          d="M258 46 C420 10 560 -2 700 -2 C840 -2 980 10 1142 46"
          fill="none"
          stroke="#6b747f"
          strokeWidth="3"
          opacity="0.5"
        />
        <path d="M700 -4 L700 470" stroke="#6b747f" strokeWidth="2.5" opacity="0.4" />
        {/* raglan shoulder seams, from the yoke out toward the sleeves */}
        <path
          d="M424 30 C402 130 382 250 368 470"
          fill="none"
          stroke="#5b6470"
          strokeWidth="2.5"
          opacity="0.45"
        />
        <path
          d="M976 30 C998 130 1018 250 1032 470"
          fill="none"
          stroke="#5b6470"
          strokeWidth="2.5"
          opacity="0.45"
        />
        <path d="M250 356 L1150 356" stroke="#6b747f" strokeWidth="2" opacity="0.42" />
        <g stroke="#2b3138" strokeWidth="2" opacity="0.75">
          {Array.from({ length: 30 }, (_, i) => (
            <path key={`${id}-rib${i}`} d={`M${268 + i * 30} 360 L${268 + i * 30} 470`} />
          ))}
        </g>

        {/* hood, sitting above the yoke */}
        <path
          d="M604 -76 C632 -34 768 -34 796 -76"
          fill="none"
          stroke="#454d58"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Back print: the brand mark, enlarged and screened on */}
        <g
          transform="translate(700 214) scale(5)"
          opacity="0.55"
          fill="none"
          stroke="#e8e4dc"
          strokeWidth="2.4"
        >
          <path d="M-38 16 L-27 -6 L-16 16" />
          <path d="M-17 16 L-6 -8 L5 16" />
        </g>

        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },

  /* 05 — newsletter: lone figure on a rooftop above the city at dusk */
  "skyline-sit": {
    viewBox: "0 0 1400 420",
    tone: "dusk",
    render: (id) => (
      <>
        <Base id={id} tone="dusk" />
        <Skyline id={id} tone="dusk" y={358} from={0} to={1420} seed={41} opacity={0.92} min={60} max={210} width={52} />
        <Skyline id={id} tone="dusk" y={364} from={200} to={1200} seed={13} opacity={0.65} min={34} max={130} width={36} />

        {/* window glow: a few lit interiors, not a texture */}
        <g fill="#d9a86f" opacity="0.35">
          <rect x="286" y="262" width="6" height="9" />
          <rect x="560" y="236" width="6" height="9" />
          <rect x="820" y="276" width="6" height="9" />
          <rect x="1180" y="246" width="6" height="9" />
        </g>

        {/* rooftop parapet */}
        <rect x="0" y="358" width="1400" height="62" fill={TONES.dusk.near} />
        <rect x="0" y="344" width="1400" height="16" fill="#1a1918" />

        {/* kept near the centre-right so the crop still works on narrow screens */}
        <SeatedFigure x={800} y={356} h={180} tone="dusk" flip />

        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },

  /* 06 — story sidebar: a single tower facade, shot looking up */
  tower: {
    viewBox: "0 0 500 700",
    tone: "overcast",
    render: (id) => (
      <>
        <Base id={id} tone="overcast" />
        <rect x="0" y="0" width="500" height="700" fill="#7d8a96" opacity="0.6" />
        <rect x="70" y="0" width="360" height="700" fill="#8f9aa4" opacity="0.75" />
        <rect x="70" y="0" width="360" height="700" fill="#5c6874" opacity="0.25" />
        <g stroke="#4c5661" strokeWidth="2.5" opacity="0.75">
          <path d="M130 0 L130 700 M190 0 L190 700 M250 0 L250 700 M310 0 L310 700 M370 0 L370 700" />
          <path d="M70 70 L430 70 M70 150 L430 150 M70 230 L430 230 M70 310 L430 310 M70 390 L430 390 M70 470 L430 470 M70 550 L430 550 M70 630 L430 630" />
        </g>
        <g fill="#c9d3dc" opacity="0.5">
          <rect x="136" y="76" width="48" height="68" />
          <rect x="256" y="236" width="48" height="68" />
          <rect x="316" y="476" width="48" height="68" />
          <rect x="76" y="396" width="48" height="68" />
        </g>
        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },

  /* 07–10 — featured products, studio lit on warm stone */
  "hooded-jacket": {
    viewBox: "0 0 800 640",
    tone: "studio",
    render: (id) => (
      <>
        <Base id={id} tone="studio" />
        <rect x="0" y="420" width="800" height="220" fill={`url(#${id}-floor)`} />
        <GarmentDefs id={id} light={false} />
        {garment(
          id,
          "M262 596 L262 300 C262 268 292 246 330 240 L370 200 L430 200 L470 240 C508 246 538 268 538 300 L538 596 Z M370 200 L400 238 L430 200",
          <g stroke="#5b6169" strokeWidth="1.6" fill="none" opacity="0.9">
            <path d="M400 238 L400 596" />
            <path d="M300 470 L500 470" />
          </g>,
        )}
        {/* hood */}
        <path
          d="M344 236 C344 186 456 186 456 236 C456 268 344 268 344 236 Z"
          fill={`url(#${id}-garment)`}
          stroke={TONES.studio.near}
          strokeWidth="1.4"
        />
        <rect width="100%" height="100%" fill={`url(#${id}-glow)`} />
      </>
    ),
  },
  crewneck: {
    viewBox: "0 0 800 640",
    tone: "studio",
    render: (id) => (
      <>
        <Base id={id} tone="studio" />
        <rect x="0" y="420" width="800" height="220" fill={`url(#${id}-floor)`} />
        <GarmentDefs id={id} light />
        {garment(
          id,
          "M250 596 L250 306 C250 274 280 252 318 246 L352 218 L448 218 L482 246 C520 252 550 274 550 306 L550 596 Z",
          <g stroke="#b6ae9f" strokeWidth="1.6" fill="none" opacity="0.8">
            <path d="M368 224 C382 250 418 250 432 224" />
            <path d="M282 566 L518 566" />
          </g>,
        )}
        <rect width="100%" height="100%" fill={`url(#${id}-glow)`} />
      </>
    ),
  },
  "cargo-pants": {
    viewBox: "0 0 800 640",
    tone: "studio",
    render: (id) => (
      <>
        <Base id={id} tone="studio" />
        <rect x="0" y="420" width="800" height="220" fill={`url(#${id}-floor)`} />
        <GarmentDefs id={id} light={false} />
        {garment(
          id,
          "M268 168 L532 168 L542 596 L432 596 L400 340 L368 596 L258 596 Z",
          <g stroke="#5b6169" strokeWidth="1.6" fill="none" opacity="0.85">
            <path d="M268 214 L532 214" />
            <path d="M276 300 L364 300 M436 300 L524 300" />
            <path d="M282 268 L282 296 M518 268 L518 296" />
          </g>,
        )}
        <rect width="100%" height="100%" fill={`url(#${id}-glow)`} />
      </>
    ),
  },
  cap: {
    viewBox: "0 0 800 640",
    tone: "studio",
    render: (id) => (
      <>
        <Base id={id} tone="studio" />
        <rect x="0" y="420" width="800" height="220" fill={`url(#${id}-floor)`} />
        <GarmentDefs id={id} light={false} />
        <path
          d="M238 396 C238 300 316 236 400 236 C484 236 562 300 562 396 Z"
          fill={`url(#${id}-garment)`}
          stroke={TONES.studio.near}
          strokeWidth="1.4"
        />
        <path
          d="M238 396 C238 396 226 400 226 412 C226 424 240 428 256 428 L548 428 C562 428 572 424 572 412 C572 400 562 396 562 396 Z"
          fill={`url(#${id}-garment)`}
          stroke={TONES.studio.near}
          strokeWidth="1.4"
        />
        <path d="M400 244 L400 392" stroke="#5b6169" strokeWidth="1.6" opacity="0.8" />
        <g transform="translate(400 322) scale(0.72)" fill="none" stroke="#e8e4dc" strokeWidth="2.4" opacity="0.85">
          <path d="M-38 16 L-27 -6 L-16 16" />
          <path d="M-17 16 L-6 -8 L5 16" />
        </g>
        <ellipse cx="400" cy="470" rx="150" ry="16" fill="#8d857a" opacity="0.5" />
        <rect width="100%" height="100%" fill={`url(#${id}-glow)`} />
      </>
    ),
  },

  /* 10–14 — category tiles, tightly cropped lifestyle detail */
  "cat-outerwear": {
    viewBox: "0 0 700 1000",
    tone: "overcast",
    render: (id) => (
      <>
        <Base id={id} tone="overcast" />
        <Skyline id={id} tone="overcast" y={330} from={0} to={700} seed={63} opacity={0.5} min={50} max={170} width={46} />
        <rect x="0" y="330" width="700" height="670" fill="#5c5f61" opacity="0.35" />
        <rect x="0" y="640" width="700" height="360" fill={TONES.overcast.near} />
        <Figure x={350} y={980} h={840} tone="overcast" pack />
        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },
  "cat-bottoms": {
    viewBox: "0 0 700 1000",
    tone: "studio",
    render: (id) => (
      <>
        <Base id={id} tone="studio" />
        <rect x="0" y="0" width="700" height="1000" fill="#9d9a92" opacity="0.45" />
        <rect x="0" y="760" width="700" height="240" fill="#6e6b65" />
        <Figure x={350} y={900} h={820} tone="studio" />
        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },
  "cat-tops": {
    viewBox: "0 0 700 1000",
    tone: "studio",
    render: (id) => (
      <>
        <Base id={id} tone="studio" />
        <rect x="0" y="0" width="700" height="1000" fill="#b8b4ac" opacity="0.5" />
        <g stroke="#8f8b84" strokeWidth="2" opacity="0.45">
          <path d="M0 240 L700 240 M0 520 L700 520" />
          <path d="M180 0 L180 1000 M520 0 L520 1000" />
        </g>
        <Figure x={350} y={900} h={880} tone="studio" flip />
        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },
  "cat-footwear": {
    viewBox: "0 0 700 1000",
    tone: "studio",
    render: (id) => (
      <>
        <Base id={id} tone="studio" />
        <rect x="0" y="0" width="700" height="1000" fill="#8f8a82" opacity="0.55" />
        <g stroke="#6f6a63" strokeWidth="2" opacity="0.4">
          <path d="M0 300 L700 300 M0 600 L700 600 M0 860 L700 860 M240 0 L240 1000 M470 0 L470 1000" />
        </g>
        <path
          d="M120 700 C120 640 180 606 268 596 L392 582 C470 572 540 596 566 646 L582 686 C592 710 580 726 552 726 L150 726 C130 726 120 716 120 700 Z"
          fill="#efece6"
          stroke="#9c968d"
          strokeWidth="2"
        />
        <path d="M268 596 L300 690 L360 682 L336 588 Z" fill="#15171a" opacity="0.9" />
        <path d="M120 700 L582 700" stroke="#c6c0b6" strokeWidth="8" />
        <ellipse cx="350" cy="766" rx="220" ry="20" fill="#7d776f" opacity="0.45" />
        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },
  "cat-accessories": {
    viewBox: "0 0 700 1000",
    tone: "studio",
    render: (id) => (
      <>
        <Base id={id} tone="studio" />
        <rect x="0" y="0" width="700" height="1000" fill="#6f6a64" opacity="0.6" />
        <g stroke="#57534e" strokeWidth="2" opacity="0.45">
          <path d="M0 200 L700 200 M0 480 L700 480 M0 740 L700 740" />
        </g>
        <path
          d="M212 320 C212 288 236 268 268 268 L432 268 C464 268 488 288 488 320 L488 720 C488 752 464 772 432 772 L268 772 C236 772 212 752 212 720 Z"
          fill="#1a1c20"
          stroke="#3d4249"
          strokeWidth="2"
        />
        <path d="M212 420 L488 420" stroke="#3d4249" strokeWidth="2" opacity="0.8" />
        <path d="M256 268 C256 210 444 210 444 268" stroke="#31363c" strokeWidth="10" fill="none" />
        <path d="M268 520 L432 520 M268 596 L432 596" stroke="#31363c" strokeWidth="3" opacity="0.7" />
        <ellipse cx="350" cy="800" rx="190" ry="18" fill="#6d6761" opacity="0.5" />
        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
      </>
    ),
  },
};
