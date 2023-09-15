import MarkNav from "../../utils/markNav"; 
import 'markdown-navbar/dist/navbar.css';

const MarkNavBar: React.FC<{ markdText: string }> = ({ markdText }) => {
      return (
            <>
                  <MarkNav source={markdText} ordered={false} />
            </>
      )
}
export default MarkNavBar