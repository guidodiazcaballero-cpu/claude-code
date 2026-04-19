interface Props {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  sub?: string;
}

export default function StatCard({ label, value, icon, color, sub }: Props) {
  return (
    <div className={`bg-white rounded-xl shadow p-5 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}
