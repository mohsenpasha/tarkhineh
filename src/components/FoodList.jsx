import SingleFood from "./SingleFood";

export default function FoodList({title,foodList}){
    return(
        <section className="food-list-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-title">{title}</div>
                </div>
                <div className="food-list">
                    {
                        foodList.map((food,foodIndex)=>{
                            return <SingleFood key={foodIndex} food={food}/>
                        })
                    }
                </div>
            </div>
        </section>
    )
}