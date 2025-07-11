import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks';

export default function NewTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date_initiale: '',
    client_offre: '',
    sujet: '',
    responsable: '',
    demandes_precises: '',
    suivi: 'À faire',
    remarques: '',
    echeance: '',
    relance: '',
    priorite: 'Moyenne',
    checklist: [{ titre: '1ere étape...', fait: false }],
    piece_jointe: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChecklistChange = (index, key, value) => {
    setForm(prev => ({
      ...prev,
      checklist: prev.checklist.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addChecklistItem = () => {
    setForm(prev => ({
      ...prev,
      checklist: [...prev.checklist, { titre: '', fait: false }],
    }));
  };

  const removeChecklistItem = index => {
    setForm(prev => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

const handleSubmit = async e => {
  e.preventDefault();

  const formToSend = { ...form };
  ['date_initiale', 'echeance', 'relance'].forEach(field => {
    if (!formToSend[field]) {
      delete formToSend[field]; // Supprimer du payload
    }
  });

  try {
    await addTask({
      ...formToSend,
      checklist: form.checklist,
    });
    navigate('/');
  } catch (err) {
    console.error('Erreur création tâche :', err.response?.data || err.message);
    alert('Impossible de créer la tâche.');
  }
};


  return (
    <>
    <h1 className='font-bold text-3xl text-center pb-3'>Création d'une nouvelle tache</h1>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      {/* Dates */}
      {['date_initiale', 'echeance', 'relance'].map(name => (
        <div key={name} className="mb-4">
          <label className="block text-sm font-medium capitalize">{name.replace('_', ' ')}</label>
          <input
            type="date"
            name={name}
            value={form[name]}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      {/* Text inputs */}
      {['client_offre','sujet','responsable','demandes_precises','remarques'].map(name => (
        <div key={name} className="mb-4">
          <label className="block text-sm font-medium capitalize">{name.replace('_', ' ')}</label>
          <input
            type="text"
            name={name}
            value={form[name]}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      {/* Selects */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Suivi</label>
          <select
            name="suivi"
            value={form.suivi}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option>À faire</option>
            <option>En cours</option>
            <option>Terminé</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Priorité</label>
          <select
            name="priorite"
            value={form.priorite}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option>Basse</option>
            <option>Moyenne</option>
            <option>Haute</option>
          </select>
        </div>
      </div>

      {/* Checklist */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Checklist</label>
        {form.checklist.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              placeholder="Titre"
              value={item.titre}
              onChange={e => handleChecklistChange(idx, 'titre', e.target.value)}
              className="flex-1 border rounded px-2 py-1"
            />
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={item.fait}
                onChange={e => handleChecklistChange(idx, 'fait', e.target.checked)}
                className="form-checkbox mt-1"
              />
              <span className="ml-1">Fait</span>
            </label>
            <button type="button" onClick={() => removeChecklistItem(idx)} className="text-red-500">✕</button>
          </div>
        ))}
        <button type="button" onClick={addChecklistItem} className="mt-2 text-blue-500">+ Ajouter un élément</button>
      </div>

      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Créer</button>
    </form>
    </>
  );
}
