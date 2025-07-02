import styles from './RightSection.module.css';

const RightSection = ({
  education,
  skills,
  certificates,
  about,
  activeSections
}) => {
  return (
    <div className={styles.previewWrapper}>
      <div className={styles.page}>
        {activeSections.includes('About') && about && (
          <section className={styles.section}>
            <h3>О себе</h3>
            <p>{about}</p>
          </section>
        )}

        {activeSections.includes('Education') && (
          <section className={styles.section}>
            <h3>Образование</h3>
            {education.map((edu, idx) => (
              <div key={idx} className={styles.item}>
                <strong>{edu.institution}</strong>
                <div>{edu.faculty}</div>
                <em>{edu.level.label}</em>
              </div>
            ))}
          </section>
        )}

        {activeSections.includes('Skills') && (
          <section className={styles.section}>
            <h3>Навыки</h3>
            <div className={styles.skills}>
              {skills.map((skill, idx) => (
                <span key={idx} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {activeSections.includes('Sertificates') && (
          <section className={styles.section}>
            <h3>Сертификаты</h3>
            {certificates.map((cert, idx) => (
              <div key={idx} className={styles.item}>
                <strong>{cert.course}</strong> — {cert.organization}
                <div>
                  <em>{cert.period}</em>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default RightSection;
