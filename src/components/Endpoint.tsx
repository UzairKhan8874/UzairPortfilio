export default function Endpoint({ verb, path, status = '200 OK' }: { verb: string; path: string; status?: string }) {
  return (
    <span className="ep">
      <b>{verb}</b>
      <i>{path}</i>
      <em>{status}</em>
    </span>
  )
}