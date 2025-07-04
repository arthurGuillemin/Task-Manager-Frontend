import { useState } from "react";

const TaskCard = ({ task, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleChecklistToggle = (index) => {
    const newChecklist = [...editedTask.checklist];
    newChecklist[index].fait = !newChecklist[index].fait;
    setEditedTask((prev) => ({ ...prev, checklist: newChecklist }));
  };

  const handleSave = () => {
    onSave(task.id, editedTask);
    setEditMode(false);
  };

  return (
    <div className="border rounded-xl p-6 shadow-md bg-white w-100 mx-auto min-h-[350px] flex flex-col justify-between space-y-4">

      {/* Sujet */}
      {editMode ? (
        <input
          className="text-2xl font-bold mb-2 text-gray-800"
          value={editedTask.sujet}
          onChange={(e) => handleChange("sujet", e.target.value)}
        />
      ) : (
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{task.sujet}</h2>
      )}

      {/* Infos principales */}
      <div className="text-gray-700 space-y-1">
        {editMode ? (
          <>
            <input
              type="text"
              className="w-full"
              value={editedTask.responsable}
              onChange={(e) => handleChange("responsable", e.target.value)}
              placeholder="Responsable"
            />
            <input
              type="text"
              className="w-full"
              value={editedTask.pilote}
              onChange={(e) => handleChange("pilote", e.target.value)}
              placeholder="Pilote"
            />
            <input
              type="text"
              className="w-full"
              value={editedTask.client_offre}
              onChange={(e) => handleChange("client_offre", e.target.value)}
              placeholder="Client"
            />
          </>
        ) : (
          <>
            <p><strong>Responsable :</strong> {task.responsable || "-"}</p>
            <p><strong>Pilote :</strong> {task.pilote || "-"}</p>
            <p><strong>Client :</strong> {task.client_offre || "-"}</p>
          </>
        )}
      </div>

      {/* Description */}
      {editMode ? (
        <textarea
          className="text-gray-600 italic w-full"
          value={editedTask.demandes_precises}
          onChange={(e) => handleChange("demandes_precises", e.target.value)}
          placeholder="Description / demandes précises"
        />
      ) : (
        <p className="text-gray-600 italic">{task.demandes_precises || "-"}</p>
      )}

      {/* Checklist */}
      {task.checklist && task.checklist.length > 0 && (
        <div>
          <strong>Checklist :</strong>
          <ul className="list-disc list-inside text-gray-600 mt-1 max-h-24 overflow-y-auto">
            {task.checklist.map((item, idx) => (
              <li
                key={idx}
                className={
                  editedTask.checklist[idx].fait
                    ? "line-through text-green-600"
                    : ""
                }
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

      {/* Footer avec échéance, priorité, remarques */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        {editMode ? (
          <>
            <span>
              Échéance :
              <input
                type="date"
                className="ml-2"
                value={editedTask.echeance || ""}
                onChange={(e) => handleChange("echeance", e.target.value)}
              />
            </span>
            <span>
              Priorité :
              <select
                  className="ml-2 border border-gray-300 rounded px-2 py-1"
                  value={editedTask.priorite}
                  onChange={(e) => handleChange("priorite", e.target.value)}
                >
                  <option value="">--</option>
                  <option value="Haute">Haute</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Basse">Basse</option>
                </select>

            </span>
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

      {editMode ? (
        <textarea
          className="mt-2 text-yellow-700 italic w-full"
          value={editedTask.remarques}
          onChange={(e) => handleChange("remarques", e.target.value)}
          placeholder="Remarques"
        />
      ) : (
        task.remarques && (
          <p className="mt-2 text-yellow-700 italic max-h-16 overflow-y-auto">
            {task.remarques}
          </p>
        )
      )}

      {/* Boutons */}
      <div className="flex justify-end gap-2 pt-2">
        {editMode ? (
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Enregistrer
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Modifier
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
