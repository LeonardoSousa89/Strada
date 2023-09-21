export function changeScreen(props: any){
    setTimeout(()=>{
        props.navigation.navigate("login") 
    },5000)
}
