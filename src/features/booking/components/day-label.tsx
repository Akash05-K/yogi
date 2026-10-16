export function DayLabel({ date }: { date: string }) {
  const d = new Date(`${date}T12:00:00`);
  return (
    <>
      <small>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</small>
      <b>{d.getDate()}</b>
      <small>{d.toLocaleDateString('en-IN', { month: 'short' })}</small>
    </>
  );
}
