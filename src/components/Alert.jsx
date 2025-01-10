export default function Alert({cls,text}){
    return(
        <div className={cls + ' alert'}>
            <span>{text}</span>
            {cls == 'green' 
            ?
            <i className="isax icon-tick-circle"/>
            :
            <i className="isax icon-close-circle"/>
            }
        </div>
    )
}