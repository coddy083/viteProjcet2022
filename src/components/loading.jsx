function Loading() {
    const NowLoading = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    }
    const LoadingImg = {
        width: '80px',
        height: '80px',
        objectfit: 'cover',
    }        

  return <div style={NowLoading}>
    <img style={LoadingImg} src="https://blog.kakaocdn.net/dn/c3Rwqs/btqVugu1Dvv/SWkENtL39bcQ7fTrWNBxu0/img.gif" />
  </div>;
}

export default Loading;