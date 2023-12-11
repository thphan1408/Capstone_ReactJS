import SvgColor from '../../components/svg-color'

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin',
    // icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: 'user',
    icon: icon('ic_user'),
  },
  {
    title: 'Thêm phim upload hình',
    path: 'add-movie',
  },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Not found',
    path: '404',
    // icon: icon('ic_disabled'),
  },
]

export default navConfig
