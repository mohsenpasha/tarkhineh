export default function SearchInput(){
    return(
        <div className="container">
            <form action="" onSubmit={(e)=>{e.preventDefault();console.log('test')}}>
                <div className="input W-100 M-tb-16 H-40">
                    <input type="text" placeholder="جستجو"/>
                    <button className="" type="submit">
                        <i className="isax icon-search-normal-1"/>
                    </button>
                </div>
            </form>
        </div>
    )
}