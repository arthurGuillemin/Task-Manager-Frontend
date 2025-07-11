import { useState } from "react";

const TaskCard = ({ task, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleChecklistToggle = (index) => {
    const updatedChecklist = [...editedTask.checklist];
    updatedChecklist[index].fait = !updatedChecklist[index].fait;
    setEditedTask((prev) => ({ ...prev, checklist: updatedChecklist }));
  };

  const handleSave = () => {
    onSave(task.id, editedTask);
    setEditMode(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full min-h-[350px] flex flex-col justify-between space-y-4">
      {/* Sujet */}
      <div>
        {editMode ? (
          <input
            className="text-2xl font-bold w-full text-gray-800"
            value={editedTask.sujet}
            onChange={(e) => handleChange("sujet", e.target.value)}
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800">{task.sujet}</h2>
        )}
      </div>

      {/* Infos principales */}
      <div className="text-gray-700 space-y-1">
        {editMode ? (
          <>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={editedTask.responsable}
              onChange={(e) => handleChange("responsable", e.target.value)}
              placeholder="Responsable"
            />
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={editedTask.client_offre}
              onChange={(e) => handleChange("client_offre", e.target.value)}
              placeholder="Client"
            />
          </>
        ) : (
          <>
            <p><strong>Responsable :</strong> {task.responsable || "-"}</p>
            <p><strong>Client :</strong> {task.client_offre || "-"}</p>
          </>
        )}
      </div>

      {/* Description */}
      <div>
        {editMode ? (
          <textarea
            className="w-full border rounded px-2 py-1 text-sm text-gray-700"
            value={editedTask.demandes_precises}
            onChange={(e) => handleChange("demandes_precises", e.target.value)}
            placeholder="Description / demandes précises"
          />
        ) : (
          <p className="text-sm italic text-gray-600">
            {task.demandes_precises || "-"}
          </p>
        )}
      </div>

      {/* Checklist */}
      {task.checklist?.length > 0 && (
        <div>
          <strong className="text-gray-800">Checklist :</strong>
          <ul className="list-disc list-inside mt-1 max-h-32 overflow-y-auto text-sm text-gray-700 space-y-1">
            {task.checklist.map((item, idx) => (
              <li
                key={idx}
                className={editedTask.checklist[idx].fait ? "line-through text-green-600" : ""}
              >
                {editMode ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editedTask.checklist[idx].fait}
                      onChange={() => handleChecklistToggle(idx)}
                    />
                    {item.titre}
                  </label>
                ) : (
                  <>
                    {item.fait ? "✔ " : "✗ "} {item.titre}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          {editMode ? (
            <>
              <div className="flex items-center gap-2">
                <label className="font-semibold">Échéance :</label>
                <input
                  type="date"
                  value={editedTask.echeance || ""}
                  onChange={(e) => handleChange("echeance", e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="font-semibold">Priorité :</label>
                <select
                  value={editedTask.priorite}
                  onChange={(e) => handleChange("priorite", e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">--</option>
                  <option value="Haute">Haute</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Basse">Basse</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <span>
                Échéance : <strong>{task.echeance || "-"}</strong>
              </span>
              <span>
                Priorité : <strong>{task.priorite || "-"}</strong>
              </span>
            </>
          )}
        </div>

        {/* Remarques */}
        {editMode ? (
          <textarea
            className="w-full border rounded px-2 py-1 text-sm text-yellow-700"
            value={editedTask.remarques}
            onChange={(e) => handleChange("remarques", e.target.value)}
            placeholder="Remarques"
          />
        ) : (
          task.remarques && (
            <p className="text-yellow-700 italic max-h-16 overflow-y-auto">
              {task.remarques}
            </p>
          )
        )}
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-2 pt-2">
        {editMode ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Enregistrer
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Modifier
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
