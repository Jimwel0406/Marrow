import { NewsletterForm } from "./NewsletterForm";
import styles from "./Newsletter.module.css";

export function Newsletter() {
  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className={`${styles.root} scroll-mt-[calc(64px+2rem)] bg-ivory text-ink lg:scroll-mt-[calc(88px+2rem)]`}
      data-reveal="newsletter"
    >
      <div className="shell py-16 text-center lg:py-24">
        <p className={`${styles.label} eyebrow text-muted`}>Newsletter</p>
        <h2
          id="newsletter-heading"
          className="page-title mt-7"
        >
          <span className={styles.line}><span className={styles.word}>Next drop.</span></span>
          <span className={styles.line}><em className={styles.word}>First look.</em></span>
        </h2>
        <div className={`${styles.content} mx-auto mt-7 max-w-[44rem]`}>
          <p className="text-body text-muted lg:whitespace-nowrap">
            One email before each drop goes live. Nothing else.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
