const HeaderContent: React.FC = () => {
      return (
            <div className="more-list">
                  <ul className="menu">
                        <li className="item">
                              <div className="icon write-article"></div>
                              <div className="title">写文章</div>
                        </li>
                        <li className="item">
                              <div className="icon issue-points"></div>
                              <div className="title">发沸点</div>
                        </li>
                        <li className="item">
                              <div className="icon write-note"></div>
                              <div className="title">写笔记</div>
                        </li>
                        <li className="item">
                              <div className="icon create-jcode"></div>
                              <div className="title">写代码</div>
                        </li>
                        <li className="item">
                              <div className="icon drafts"></div>
                              <div className="title">草稿箱</div>
                        </li>
                  </ul>
            </div>
      )
}

export default HeaderContent;