import { useState } from "react"

export default function QuestionBox({questions}){
    return(
        <section className="question-section">
            <div className="container">
                <div className="question-box">
                    {
                        questions.map((q,qIndex) => {
                            return (<Question key={qIndex} title={q.title} answer={q.answer}/>)
                        })
                    }
                </div>
            </div>
        </section>
    )
}
export function Question({title,answer}){
    const [toggle,setToggle] = useState(false)
    return(
        <div className={toggle ? 'question active' : 'question'}>
            <div className="q-head" onClick={()=>setToggle(!toggle)}>
                <div className="q-title">{title}</div>
                <i className="isax icon-arrow-down-1" />
            </div>
            <div className="q-content">{answer}</div>
        </div>
    )
}