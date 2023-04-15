import React from "react";
import styles from "./styles.module.scss";

function Footer2() {
  return (
    <div className="bg-black p-2">
      <footer className={styles.footer}>
        <div className={styles.containerFooter}>
          <div className={styles.icons}></div>
          <ul className={styles.details}>
            <li>FAQ</li>
            <li>Investor Relations</li>
            <li>Privacy</li>
            <li>Speed Test</li>
            <li>Help Center</li>
            <li>Jobs</li>
            <li>Cookie Preference</li>
            <li>Legal Notices</li>
            <li>Account</li>
            <li>Ways to Watch</li>
            <li>Corporate Information</li>
            <li>iOS</li>
            <li>Android</li>
          </ul>
          <div className={styles.security}>
            <div>Engligh</div>
            <span>© 1997-2024 Netflix, Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer2;
