import { Box, Button, Code, Flex, Grid, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useReducer, useState } from 'react'
import PalletReducer from '../reducers/pallet'
import styles from '../styles/Home.module.css'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Pallet } from '../types/pallet'
import { v4 as uuid } from 'uuid';
import { Color, ColorPicker, toColor, useColor } from 'react-color-palette'
import "react-color-palette/lib/css/styles.css";
import CellCard from '../components/CellCard'
import useLocalStorage from '../hooks/useLocalStorage'

const Header = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 24px;
`

const title = "何の変哲もない、ただのカラーパレット"
const url = "https://tadano-pallet.boke0ya.com"
const description = "他の人が考えた色の組み合わせとか、AIが考えてくれた色とか、理論的に絶妙な配色とか、そういうのが出てこない、ただのパレットです。"
const imgUrl = "https://tadano-pallet.boke0ya.com/ogp.png"
const imgWidth = 1200
const imgHeight = 630

const Home: NextPage = () => {
  const { data, save } = useLocalStorage()
  const [selectedPallet, setSelectedPallet] = useState<string | null>(null)
  const [selectedCell, setSelectedCell] = useState<string | null>(null)
  const [palletState, palletDispatch] = useReducer(PalletReducer, {
    loaded: false,
    pallets: data?.pallets ?? [
      {
        id: uuid(),
        name: 'ただのパレット1',
        cells: [
          {
            id: uuid(),
            name: 'color-0',
            color: '#ffffff'
          }
        ]
      }
    ] as Pallet[]
  })
  const [color, setColor] = useColor('hex', '#ffffff')
  const changeTab = (tabIndex: number) => {
    if(tabIndex == palletState.pallets.length) return
    setSelectedPallet(palletState.pallets[tabIndex].id)
  }
  const addPallet = () => {
    palletDispatch({
      type: 'ADD_PALLET',
      name: 'ただのパレット' + (palletState.pallets.length+1)
    })
  }
  const updateColor = (color: Color) => {
    const palletId = selectedPallet ?? palletState.pallets[0].id
    const cells = palletState.pallets.find(pallet => pallet.id === palletId)?.cells
    if(!cells) return
    const cell = selectedCell ? cells.find(cell => cell.id === selectedCell) : cells[0]
    if(!cell) return
    palletDispatch({
      type: 'UPDATE_CELL',
      palletId,
      cellId: cell.id,
      color: color.hex,
      name: cell.name,
    })
    setColor(color)
  }
  const addCell = () => {
    const palletId = selectedPallet ?? palletState.pallets[0].id
    const cells = palletState.pallets.find(pallet => pallet.id === palletId)?.cells
    if(!cells) return
    palletDispatch({
      type: 'ADD_CELL',
      palletId,
      name: 'color-' + (cells.length),
    })
  }
  const removeCell = (id: string) => {
    const palletId = selectedPallet ?? palletState.pallets[0].id
    const cells = palletState.pallets.find(pallet => pallet.id === palletId)?.cells
    if(!cells) return
    const cell = cells.find(cell => cell.id === id)
    if(!cell) return
    palletDispatch({
      type: 'REMOVE_CELL',
      palletId,
      cellId: cell.id,
    })
  }
  const selectCell = (id: string) => {
    const palletId = selectedPallet ?? palletState.pallets[0].id
    const cells = palletState.pallets.find(pallet => pallet.id === palletId)?.cells
    if(!cells) return
    const cell = selectedCell ? cells.find(cell => cell.id === id) : cells[0]
    if(!cell) return
    setSelectedCell(id)
    setColor(toColor('hex', cell.color))
  }
  const updateCellName = (id: string, name: string) => {
    const palletId = selectedPallet ?? palletState.pallets[0].id
    const cells = palletState.pallets.find(pallet => pallet.id === palletId)?.cells
    if(!cells) return
    const cell = selectedCell ? cells.find(cell => cell.id === id) : cells[0]
    if(!cell) return
    palletDispatch({
      type: 'UPDATE_CELL',
      palletId,
      cellId: cell.id,
      color: color.hex,
      name: name,
    })
  }
  const removePallet = () => {
    const palletId = selectedPallet ?? palletState.pallets[0].id
    palletDispatch({
      type: 'REMOVE_PALLET',
      palletId,
    })
  }
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [scss, setScss] = useState('');
  const showScssExported = () => {
    const palletId = selectedPallet ?? palletState.pallets[0].id
    const cells = palletState.pallets.find(pallet => pallet.id === palletId)?.cells
    if(!cells) return
    setScss(cells.map(cell => `\$${cell.name}: ${cell.color};`).join('\n'))
    onOpen()
  }
  useEffect(() => {
    save({
      version: '1',
      pallets: palletState.pallets,
    })
  }, [palletState, save])
  return (
    <>
      <Head>
        <title>title</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imgUrl} />
        <meta property="og:image:width" content={String(imgWidth)} />
        <meta property="og:image:height" content={String(imgHeight)} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@boke0_jp" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imgUrl} />
      </Head>
      <Header>
        <Image src='/title.png' alt='何の変哲もない、ただのカラーパレット' width={240} height={96} />
      </Header>
      <Tabs onChange={changeTab} mt={4}>
        <TabList>
          {palletState.pallets.map((pallet: Pallet) => {
            return (
              <Tab key={pallet.id}>{pallet.name}</Tab>
            )
          })}
          <Tab key={'add-pallet'} onClick={addPallet}>
            <AddIcon />
          </Tab>
        </TabList>
        <TabPanels>
          {palletState.pallets.map((pallet: Pallet) => {
            return (
              <TabPanel key={pallet.id}>
                <Grid templateColumns='1fr auto'>
                  <Box p={2} pr={4}>
                    {pallet.cells.map(cell => (
                      <CellCard key={cell.id} {...cell} selected={cell.id === selectedCell} onClick={() => selectCell(cell.id)} onUpdateName={(e) => updateCellName(cell.id, e.target.value)} onRemove={() => removeCell(cell.id)} />
                    ))}
                    <Flex mt={8}>
                      <Button
                        leftIcon={<AddIcon />}
                        onClick={addCell}
                      >
                        追加
                      </Button>
                      <Spacer />
                      <Button
                        leftIcon={<EditIcon />}
                        onClick={showScssExported}
                        mr={4}
                      >
                        SCSS出力
                      </Button>
                      <Button
                        leftIcon={<DeleteIcon />}
                        colorScheme='red'
                        disabled={palletState.pallets.length <= 1}
                        onClick={removePallet}
                      >
                        パレットを削除
                      </Button>
                    </Flex>
                  </Box>
                  <Box p={2}>
                    <ColorPicker width={320} color={color} onChange={updateColor} />
                  </Box>
                </Grid>
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            SCSS出力
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Code><pre>{ scss }</pre></Code>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Home
