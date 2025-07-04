const TaskCard = ({ task }) => {
  return (
      <div className="border rounded-xl p-6 shadow-md bg-white w-100  mx-auto min-h-[350px] flex flex-col justify-between space-y-4">
      {/* Sujet */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{task.sujet}</h2>

      {/* Infos principales */}
      <div className="text-gray-700 space-y-1">
        <p><strong>Responsable :</strong> {task.responsable || "-"}</p>
        <p><strong>Pilote :</strong> {task.pilote || "-"}</p>
        <p><strong>Client :</strong> {task.client_offre || "-"}</p>
      </div>

      {/* Description / demandes précises */}
      <p className="text-gray-600 italic">{task.demandes_precises || "-"}</p>

      {/* Checklist simple */}
      {task.checklist && task.checklist.length > 0 && (
        <div>
          <strong>Checklist :</strong>
          <ul className="list-disc list-inside text-gray-600 mt-1 max-h-24 overflow-y-auto">
            {task.checklist.map((item, idx) => (
              <li
                key={idx}
                className={item.fait ? "line-through text-green-600" : ""}
              >
                {item.fait ? "✔ " : "✗ "} {item.titre}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer avec échéance, priorité, remarques */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Échéance : <strong>{task.echeance || "-"}</strong></span>
        <span>Priorité : <strong>{task.priorite || "-"}</strong></span>
      </div>
      {task.remarques && (
        <p className="mt-2 text-yellow-700 italic max-h-16 overflow-y-auto">{task.remarques}</p>
      )}
    </div>
  );
};

export default TaskCard;
