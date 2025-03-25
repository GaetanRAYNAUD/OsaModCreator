import CircularProgress from '@mui/material/CircularProgress'

const AbsoluteLoader = () => {
  return (
    <div>
      <CircularProgress size={ 42 } sx={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        minHeight: '100vh',
        zIndex: 1500,
      } } />
    </div>
  )
}

export default AbsoluteLoader
