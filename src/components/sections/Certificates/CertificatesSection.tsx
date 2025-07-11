import { useState } from 'react';
import styles from './CertificatesSection.module.css';
import Input from '../../Input/Input.tsx';
import DatePicker from '../../DatePicker/DatePicker.tsx';
import Button from '../../Buttons/button.tsx';
import { FaPlus } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import type { CerProps, Certificate } from './types';
import { FaRegEdit } from 'react-icons/fa';
import Modal from '../../modal/Modal.tsx';

let idCounter = 0;

const CertificatesSection = ({ onDeleteSection, data, setData }: CerProps) => {
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (cert?: Certificate) => {
    setEditingCert(cert || { id: idCounter++, course: '', organization: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCert(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (!editingCert) return;

    const certWithDate: Certificate = {
      ...editingCert,
      date: editingCert.date || null
    };

    const updated = (() => {
      const exists = data.find((c) => c.id === editingCert.id);
      if (exists) {
        return data.map((c) => (c.id === editingCert.id ? certWithDate : c));
      }
      return [...data, certWithDate];
    })();

    setData(updated);

    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setData(data.filter((c) => c.id !== id));
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Сертификаты</h2>
        <div className={styles.sectionButtons}>
          {data.length < 3 && (
            <Button
              type='primary'
              htmlType='button'
              className={styles.sectionButton}
              onClick={() => handleOpenModal()}
            >
              <FaPlus className={styles.icon} />
            </Button>
          )}
          <Button
            type='primary'
            htmlType='button'
            className={styles.sectionButton}
            onClick={onDeleteSection}
          >
            <MdDeleteOutline className={styles.icon} />
          </Button>
        </div>
      </div>

      <div className={styles.certCards}>
        {data.map((cert) => (
          <div key={cert.id} className={styles.certCard}>
            <div className={styles.certInfo}>
              <strong>{cert.course}</strong>
              <span>{cert.organization}</span>
              {cert.date && (
                <span>{cert.date.toLocaleDateString('ru-RU')}</span>
              )}
            </div>
            <div className={styles.certActions}>
              <button onClick={() => handleOpenModal(cert)}>
                <FaRegEdit className={styles.icon} />
              </button>
              <button onClick={() => handleDelete(cert.id)}>
                <MdDeleteOutline className={styles.icon} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
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
            <DatePicker
              value={editingCert?.date || null}
              onChange={(date) =>
                setEditingCert((prev) => prev && { ...prev, date })
              }
            />
            <div className={styles.modalActions}>
              <Button type='primary' htmlType='submit'>
                Сохранить
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CertificatesSection;
