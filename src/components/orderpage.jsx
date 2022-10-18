export default function Pages({ Page, AllPages, setPage }) {
    return (
        <div className="order_list_page">
        <div className="order_list_page_left">
          <button className="order_list_page_left_button" onClick={() => Page > 1 && setPage(Page - 1)}>이전</button>
        </div>
        <div className="order_list_page_center">
          <div className="order_list_page_center_text">
            {Page} / {AllPages}
          </div>
        </div>
        <div className="order_list_page_right">
          <button className="order_list_page_right_button" onClick={() => Page < AllPages && setPage(Page + 1)}>다음</button>
        </div>
      </div>
    );
};