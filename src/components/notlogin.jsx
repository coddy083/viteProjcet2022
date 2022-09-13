function NotLogin() {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    };

  return (
    <div style={style}>
      로그인이 필요한 서비스 입니다.
    </div>
  );
}


export default NotLogin;