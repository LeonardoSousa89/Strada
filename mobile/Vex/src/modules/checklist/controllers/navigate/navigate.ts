import { navigate } from '../../services/navigate/navigate'

export const changeScreen = (props: any, path: string) => navigate(props, path)