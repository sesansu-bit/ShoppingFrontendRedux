import styles from "./login.module.css";
const Login= () => {
return(
    <>
<div className={styles["logindetail"]}>
            <p>Log <span>In</span></p>
            <input   placeholder="Username"/>
            <input placeholder="Password"/>
            <br/>
            <div className={styles["button"]}>Log in</div>
                <div className={styles["forget"]}>Forget Password? <span className={styles["signin"]}>signin</span></div>
        </div>

</>
  );
};
export default Login;
