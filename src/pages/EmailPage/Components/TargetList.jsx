import DataTable from "../../../components/ui/Table";
import useFetch from "../../../hooks/useFetch";
import Options from "./Options";
import RemoveEmail from "./options/RemoveEmail";

function TargetList() {
  const { data, loading, refetch } = useFetch("http://80.97.124.100:3000/api/targets");
  
// Update your columns in TargetList.js
const columns = ["name", "email", "remove"];

const enhancedData = data?.map(item => ({
  name: item.name,
  email: item.email,
  remove: <RemoveEmail id={item._id} onRemove={refetch} />
}));

  return (
    <div className="text-black">
      <Options onAdd={refetch} />
      <DataTable columns={columns} data={enhancedData} loading={loading} />
    </div>
  );
}

export default TargetList;