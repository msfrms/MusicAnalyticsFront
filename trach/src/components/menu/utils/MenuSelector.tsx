import { searchSelector } from '../../search/utils/SearchSelector'
import { MenuProps } from '../MenuComponent'

export function menuSelector(): MenuProps {
    return {
        search: searchSelector(),
        charts: {
            title: 'Чарты',
            onClick: (router) => router.push('/chart'),
        },
        promotion: {
            title: 'Продвижение',
            onClick: console.log,
        },
        bookmarks: {
            title: 'Бета версия',
            onClick: console.log,
        },
    }
}
