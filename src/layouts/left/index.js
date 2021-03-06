import React from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import style from './left.less';
// import menuRoute from 'src/components/menu/menuRoute'
class left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      activeIndex: -1,
      activeItemIndex: -1,
    };
  }

  render() {
    return (
      <div className={style.main}>
        <div className={style.title}>
          {this.props.title}
        </div>
        <div className={style.links}>
          {this.props.menus.map((link, index) => {
            if (link.render) {
              return link.render();
            }
            return (
              <div key={index} onClick={() => {
                if (this.state.activeIndex == index) {
                  this.setState({
                    activeIndex: -1,
                    activeItemIndex: -1,
                  });
                } else {
                  this.setState({
                    activeIndex: index,
                    activeItemIndex: -1,
                  });
                }
              }}
              >
                <LinkItem
                  link={link}
                  activeItem={this.state.activeItemIndex}
                  setItemActive={(index) => {
                    this.setState({
                      activeItemIndex: index,
                    });
                  }}
                  active={(this.state.activeIndex == index)}
                  key={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentWillMount() {
    let activeIndex = -1;
    let activeItemIndex = -1;
    this.props.menus.map((e, index) => {
      if (e.active) {
        activeIndex = index;
      } else if (e.children) {
        e.children.map((ee, ind) => {
          if (ee.active) {
            activeIndex = index;
            activeItemIndex = ind;
          }
        });
      }
    });
    this.setState({
      activeIndex,
      activeItemIndex,
    });
  }

  componentDidMount() {

  }
}
function mapStateToProps(state) {
  // const { data } = state.menu;
  return {
    // data
  };
}
const locationLeft = withRouter(left);
export default connect(mapStateToProps)(locationLeft);

// acitve 应该可以由外部传入
function LinkItem(prop) {
  return (
    <div>
      <a
        onClick={prop.link.router}
        href='#!'
        style={{
          borderColor: prop.item ? 'white' : '',
        }}
        className={prop.active ? style.activeLinkItem : style.linkItem}
      >
        <div className={style.linkImage}>
          <img src={prop.link.active ? prop.link.activeIcon : prop.link.icon} />
        </div>
        <div className={style.linkTitle}>
          <div>{prop.link.title}</div>
          {(prop.link.children || []).length ? (
            <div className={prop.active ? style.linkIconActive : style.linkIcon}>
              <i style={{color: '#909090'}} className="iconfont iconf11-copy" />
            </div>
          ) : ''}
        </div>
      </a>
      {(prop.link.children || []).length && prop.active ? (
        <div style={{background: '#fff'}}>
          {prop.link.children.map((e, index) => {
            return (
              <div onClick={(e) => {
                prop.setItemActive(index);
                e.stopPropagation();
              }}
              >
                <LinkItem item active={prop.activeItem == index} link={e} />
              </div>
            );
          })}
        </div>
      ) : ''}
    </div>
  );
}
