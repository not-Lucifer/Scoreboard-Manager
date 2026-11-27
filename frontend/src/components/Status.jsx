function Status({ status }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-live">
        <span className="h-2 w-2 rounded-full bg-live motion-safe:animate-pulse"></span>
        Live
      </span>
    )
  }
  return <span className="text-sm text-muted">{status === 'finished' ? 'Finished' : 'Upcoming'}</span>
}

export default Status
