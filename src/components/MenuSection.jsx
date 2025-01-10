export default function MenuSection(){
    return (
        <section className="menu-section">
            <div className="container">
                <div className="section-title">منوی رستوران</div>
                <div className="menu-items">
                    <div className="menu-item">
                        <img src="images/main-food.png" alt="" />
                        <div className="item-title">غذای اصلی</div>
                    </div>
                    <div className="menu-item">
                        <img src="images/appetizer.png" alt="" />
                        <div className="item-title">پیش غذا</div>
                    </div>
                    <div className="menu-item">
                        <img src="images/dessert.png" alt="" />
                        <div className="item-title">دسر</div>
                    </div>
                    <div className="menu-item">
                        <img src="images/drink.png" alt="" />
                        <div className="item-title">نوشیدنی</div>
                    </div>
                </div>
            </div>
        </section>
    )
}