import '../styles/common/NavBar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { setBadge } from '../store/chatRoomsSlice';

export default function NavBar() {
  const { unreadCounts } = useSelector((state: RootState) => state.chat);
  const { rooms, badge } = useSelector((state: RootState) => state.chatRooms);

  const dispatch = useDispatch();

  useEffect(() => {
    const hasUnreadMessages = rooms?.some(
      (room) => unreadCounts[room.chatroomId] > 0
    );
    dispatch(setBadge(hasUnreadMessages));
  }, [unreadCounts, rooms]);

  console.log('dotdot', badge);

  return (
    <nav className="navigation">
      <div className="inner">
        <ul className="nav-lists">
          <li className="nav-list">
            <Link to={'/'}>
              <i className="xi-home nav-icon"></i>
              <span>홈</span>
            </Link>
          </li>
          <li className="nav-list">
            <Link to={'/meeting/create'} className="go-meeting-create">
              <i className="xi-users-plus nav-icon"></i>
              <span>모임 생성</span>
            </Link>
          </li>
          <li className="nav-list">
            <Link to={'/chatroom/list'}>
              <i className="xi-message-o nav-icon"></i>
              {badge ? <span className="chat-badge"></span> : null}
              <span>채팅</span>
            </Link>
          </li>
          <li className="nav-list">
            <Link to={'/mypage'}>
              <i className="xi-profile nav-icon"></i>
              <span>마이페이지</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
