import { useEffect, useRef, useState } from 'react';
import styles from './CertificatesSection.module.css';
import Input from '../../Input/Input.tsx';
import DatePicker from '../../DatePicker/DatePicker.tsx';
import Button from '../../Buttons/button.tsx';

interface Certificate {
  id: number;
  course: string;
  organization: string;
  period: string;
}

let idCounter = 0;

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (cert?: Certificate) => {
    setEditingCert(
      cert || { id: idCounter++, course: '', organization: '', period: '' }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCert(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (!editingCert) return;

    setCertificates((prev) => {
      const exists = prev.find((c) => c.id === editingCert.id);
      if (exists) {
        return prev.map((c) => (c.id === editingCert.id ? editingCert : c));
      }
      return [...prev, editingCert];
    });

    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setCertificates(certificates.filter((c) => c.id !== id));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  if (!isVisible) return null;

  return (
    <div className={styles.certificatesSection}>
      <div className={styles.sectionHeader}>
        <h2>Сертификаты</h2>
        <button onClick={() => setIsVisible(false)}>🗑</button>
      </div>

      <div className={styles.certCards}>
        {certificates.map((cert) => (
          <div key={cert.id} className={styles.certCard}>
            <div className={styles.certInfo}>
              <strong>{cert.course}</strong>
              <span>{cert.organization}</span>
              <em>{cert.period}</em>
            </div>
            <div className={styles.certActions}>
              <button onClick={() => handleOpenModal(cert)}>✏️</button>
              <button onClick={() => handleDelete(cert.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.addButton} onClick={() => handleOpenModal()}>
        ＋ Добавить сертификат
      </button>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal} ref={modalRef}>
            <h3>Редактирование сертификата</h3>
            <form onSubmit={handleSave} className={styles.form}>
              <Input
                id='courseInput'
                type='text'
                label='Название курса'
                value={editingCert?.course || ''}
                onChange={(e) =>
                  setEditingCert(
                    (prev) => prev && { ...prev, course: e.target.value }
                  )
                }
                required
              />
              <Input
                id='organizationInput'
                type='text'
                label='Организация'
                value={editingCert?.organization || ''}
                onChange={(e) =>
                  setEditingCert(
                    (prev) => prev && { ...prev, organization: e.target.value }
                  )
                }
                required
              />
              <DatePicker />
              <div className={styles.modalActions}>
                <Button type='primary' htmlType='submit'>
                  Сохранить
                </Button>
                <Button type='secondary' onClick={handleCloseModal}>
                  ✖
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesSection;
