import { Link } from "react-router-dom";
const Linkpage = () => {
    return (
        <div>
            <Link to={'/'}>Intro</Link> <br />
            <Link to={'/create-asset'}>User create asset</Link><br />
            <Link to={'/admin-panel'}>Admin panel</Link>br
        </div>
    )
}

export default Linkpage;