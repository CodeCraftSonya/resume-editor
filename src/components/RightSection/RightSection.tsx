import styles from './RightSection.module.css';

const RightSection = ({
  education,
  skills,
  certificates,
  about,
  name,
  activeSections
}) => {
  return (
    <div className={styles.previewWrapper}>
      <div className={styles.page}>
        <h3 className={styles.name}>{name}</h3>
        {activeSections.map((section) => {
          switch (section) {
            case 'About':
              return (
                about && (
                  <section className={styles.section} key='About'>
                    <h3>О себе</h3>
                    <p>{about}</p>
                  </section>
                )
              );
            case 'Education':
              return (
                education.length > 0 && (
                  <section className={styles.section} key='Education'>
                    <h3>Образование</h3>
                    {education.map((edu, idx) => (
                      <div key={idx}>
                        <strong>{edu.level}</strong>, {edu.institution}
                      </div>
                    ))}
                  </section>
                )
              );
            case 'Skills':
              return (
                skills.length > 0 && (
                  <section className={styles.section} key='Skills'>
                    <h3>Навыки</h3>
                    <div className={styles.skills}>
                      {skills.map((skill, idx) => (
                        <span key={idx} className={styles.skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )
              );
            case 'Sertificates':
              return (
                certificates.length > 0 && (
                  <section className={styles.section} key='Sertificates'>
                    <h3>Сертификаты</h3>
                    {certificates.map((cert, idx) => (
                      <div key={idx}>
                        <strong>{cert.course}</strong> — {cert.organization}
                        <br />
                        {cert.date && (
                          <div>{cert.date.toLocaleDateString('ru-RU')}</div>
                        )}
                      </div>
                    ))}
                  </section>
                )
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default RightSection;
