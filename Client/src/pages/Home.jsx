import { useState, useMemo } from "react";
import useTasks from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

const prioritéOrder = { Haute: 1, Moyenne: 2, Basse: 3 };

const Home = () => {
  const { tasks, loading } = useTasks();

  const [searchText, setSearchText] = useState("");


  const [sortBy, setSortBy] = useState("date_asc");
  const [filters, setFilters] = useState({
    client: "all",
    priorite: "all",
    responsable: "all",
    suivi: "all",
    checklist: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredAndSortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => {
          if (searchText.trim() !== "") {
          const text = searchText.toLowerCase();
          const found =
            (task.sujet && task.sujet.toLowerCase().includes(text)) ||
            (task.client_offre && task.client_offre.toLowerCase().includes(text)) ||
            (task.responsable && task.responsable.toLowerCase().includes(text)) ||
            (task.pilote && task.pilote.toLowerCase().includes(text)) ||
            (task.remarques && task.remarques.toLowerCase().includes(text));
          if (!found) return false;
        }
        if (filters.client !== "all" && task.client_offre !== filters.client) return false;
        if (filters.priorite !== "all" && task.priorite !== filters.priorite) return false;
        if (filters.responsable !== "all" && task.responsable !== filters.responsable) return false;
        if (filters.suivi !== "all" && task.suivi !== filters.suivi) return false;
        if (filters.checklist === "complete") {
          return task.checklist.length > 0 && task.checklist.every((item) => item.fait);
        }
        if (filters.checklist === "incomplete") {
          return task.checklist.some((item) => !item.fait);
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date_asc":
            const dateA = a.date_initiale ? new Date(a.date_initiale) : new Date(8640000000000000);
            const dateB = b.date_initiale ? new Date(b.date_initiale) : new Date(8640000000000000);
            return dateA - dateB;

          case "echeance":
            const echA = a.echeance ? new Date(a.echeance) : new Date(8640000000000000);
            const echB = b.echeance ? new Date(b.echeance) : new Date(8640000000000000);
            return echA - echB;
          case "date_desc":
            return new Date(b.date_initiale) - new Date(a.date_initiale);
          case "priorite":
            return prioritéOrder[a.priorite] - prioritéOrder[b.priorite];
          case "client":
            return a.client_offre.localeCompare(b.client_offre);
          case "responsable":
            return a.responsable.localeCompare(b.responsable);
          case "checklist":
            const doneA = a.checklist.filter((item) => item.fait).length;
            const doneB = b.checklist.filter((item) => item.fait).length;
            return doneB - doneA;
          default:
            return 0;
        }
      });
  }, [tasks, filters, sortBy, searchText]);

  if (loading) return <Loader />;

const handleReset = () => {
  setSortBy("date_asc");
  setFilters({
    client: "all",
    priorite: "all",
    responsable: "all",
    suivi: "all",
    checklist: "all",
  });
  setSearchText("");
};



  const clients = [...new Set(tasks.map((t) => t.client_offre))];
  const responsables = [...new Set(tasks.map((t) => t.responsable))];
  const suivis = [...new Set(tasks.map((t) => t.suivi))];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Trier par</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date_asc">Date la plus ancienne</option>
            <option value="date_desc">Date la plus récente</option>
            <option value="echeance">Échéance proche</option>
            <option value="priorite">Priorité (Haute → Basse)</option>
            <option value="client">Client (A → Z)</option>
            <option value="responsable">Responsable (A → Z)</option>
            <option value="checklist">Checklist + avancée</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Client</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={filters.client}
            onChange={(e) => handleFilterChange("client", e.target.value)}
          >
            <option value="all">Tous</option>
            {clients.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Priorité</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={filters.priorite}
            onChange={(e) => handleFilterChange("priorite", e.target.value)}
          >
            <option value="all">Toutes</option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Responsable</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={filters.responsable}
            onChange={(e) => handleFilterChange("responsable", e.target.value)}
          >
            <option value="all">Tous</option>
            {responsables.map((resp) => (
              <option key={resp} value={resp}>
                {resp}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Suivi</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={filters.suivi}
            onChange={(e) => handleFilterChange("suivi", e.target.value)}
          >
            <option value="all">Tous</option>
            {suivis.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Checklist</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={filters.checklist}
            onChange={(e) => handleFilterChange("checklist", e.target.value)}
          >
            <option value="all">Toutes</option>
            <option value="complete">Complète</option>
            <option value="incomplete">Incomplète</option>
          </select>
        </div>
      </div>
      <button
  onClick={handleReset}
  className="mt-2 px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded hover:bg-gray-200"
>
  🔄 Réinitialiser les filtres
</button>
<div className="mb-4">

  <label htmlFor="search" className="block text-sm font-medium mb-1">Recherche rapide</label>
  <input
    id="search"
    type="text"
    className="w-full border rounded px-2 py-1"
    placeholder="Recherche texte..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />
</div>



      <div className="flex flex-wrap  py-16">
        {filteredAndSortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {filteredAndSortedTasks.length === 0 && (
          <p className="text-center text-gray-500 italic">Aucune tâche trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
