import { ModLayout } from '@components/layout/ModLayout.tsx'
import { FolderItem, ItemCategory } from '@eu4/items.ts'
import { Descriptor } from '@eu4/types.ts'
import React from 'react'

type Props<T> = {
  descriptor: Descriptor,
  category: ItemCategory,
  item: FolderItem<T>,
}

export function ModListLayout({
                                category, item, descriptor, children,
                              }: React.PropsWithChildren<Props<any>>) {

  return (
    <ModLayout category={ category } item={ item } descriptor={ descriptor }>
      { children }
    </ModLayout>
  )
}
