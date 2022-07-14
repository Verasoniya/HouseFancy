import { useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} navigate={navigate} params={params} />;
  };
  return Wrapper;
};
export { withRouter };
