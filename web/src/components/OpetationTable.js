import React, { useContext } from 'react'
import styled from 'styled-components'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter'
import moment from 'moment'
import { formatPrice } from 'utils'
import { Box, Button, Grid, Hidden, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import StoreContext from 'contexts/StoreContext'
import Img from 'components/Img'

//import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;  
  input[placeholder], [placeholder], *[placeholder] {
    color: red !important;
} 
  table {
    border-spacing: 0;
    thead{  
    }
    tr { 
    font-size: 16px;
    line-height: 1.2;
    font-weight: unset; 

    td{
        
    border-bottom: 1px solid gray;
    color: gray;
    }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const useStyles = makeStyles((theme) => ({
    inputPlace: {
        '&::placeholder': {
            fontStyle: 'italic',
            color: 'white'
        },
    },
}))
// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const classes = useStyles()
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        < >
            <Hidden mdDown>
                <Box>
                    <Paper component="form" /*className={classes.search}*/
                        style={{
                            padding: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            height: 35,
                            //width: 700,
                            backgroundColor: '#EA1D2C',
                            color: '#ffffff',
                        }}
                    >
                        <InputBase
                            onChange={e => {
                                setValue(e.target.value);
                                onChange(e.target.value);
                            }}
                            style={{
                                fontSize: '1.1rem',
                                border: '0',

                                flex: 1,
                            }}
                            type="text"
                            value={value || ""}
                            // className={classes.input}
                            placeholder="Pesquisa Geral"
                            id="input-geral"
                            inputProps={{
                                //'aria-label': 'search google maps',
                                style: { color: '#ffffff' },
                                classes: { input: classes.input }
                            }}
                        />
                        <SearchIcon />
                    </Paper>
                </Box>
            </Hidden>


            {/*<input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`Digite o valor procurado`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />*/}
        </ >
    )
}

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows?.forEach(row => {
            options.add(row?.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value)
            }}
        >
            <option value="">Todos</option>
            {options

                .map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
        </select>
    )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={e => {
                    setFilter(parseInt(e.target.value, 10))
                }}
            />
            <button onClick={() => setFilter(undefined)}>Off</button>
        </>
    )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <input
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                }}
                placeholder={`Min  ${min}`}
                style={{
                    width: '70px',
                    marginRight: '0.5rem',
                }}
            />
            Até
            <input
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                placeholder={`Max ${max}`}
                style={{
                    width: '70px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows
                    .filter(row => {
                        const rowValue = row.values[id]
                        return rowValue !== undefined
                            ? String(rowValue)
                                .toLowerCase()
                                .startsWith(String(filterValue).toLowerCase())
                            : true
                    })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter // useGlobalFilter!
    )

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice(0, 10)

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    <tr>
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {console.log(column)}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter &&
                                        ["Opções", "Data"].indexOf(column.Header) === -1
                                        ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
        </>
    )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row?.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

function OpetationTable({ dados }) {
    const { user } = useContext(StoreContext)
    const editRow = () => { }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Data',
                accessor: 'createdAt',
                Cell: ({ value }) => (moment(value).locale('pt').format('DD/MM/yyyy'))
            },
            {
                Header: 'Transação',
                accessor: 'transation',
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
            {
                Header: 'Tipo',
                accessor: 'tipo',
                Filter: SelectColumnFilter,
                filter: 'includes',
                Cell: ({ row, value }) => (
                    <Grid justifyContent="center" style={{ display: 'flex' }}>{
                        row.original.sender._id !== user?._id ?
                            <img src="https://img.icons8.com/material-sharp/24/000000/resize-horizontal.png" />
                            : value === "saida" ?
                                <img src="https://img.icons8.com/ios-filled/24/fa314a/sort-down.png" />
                                :
                                <img src="https://img.icons8.com/ios-filled/24/26e07f/sort-up.png" />
                    }</Grid>
                )
            },
            {
                Header: 'Categoria',
                accessor: 'category',
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
            {
                Header: 'Destinatário',
                accessor: 'receiver.name',
                Filter: SelectColumnFilter,
                filter: 'includes',
                Cell: ({ row, value }) => (
                    <Grid justifyContent="center" style={{ display: 'flex' }}>
                        <Img src={row.original.sender?.photo} isAvatar={true}
                            alt={value} isExternal={true} />
                    </Grid>
                )
            },
            {
                Header: 'Remetente',
                accessor: 'sender.name',
                Filter: SelectColumnFilter,
                filter: 'includes',
                Cell: ({ value }) => (value),
                Cell: ({ row, value }) => (
                    <Grid justifyContent="center" style={{ display: 'flex' }}>
                        <Img src={row.original.sender?.photo} isAvatar={true}
                            alt={value} isExternal={true} />
                    </Grid>
                )
            },
            {
                Header: 'Valor',
                accessor: 'valor',
                Cell: ({ value }) => (formatPrice(parseFloat(value))),
                Filter: NumberRangeColumnFilter,
                filter: 'between',
            },
            {
                Header: 'Opções',
                id: 'edit',
                disableFilter: false,
                accessor: '_id',
                Cell: ({ row, value }) => (
                    row.original.sender._id !== user?._id ?
                        null ://somente são alteradas transações do mesmo usuário
                        <Grid>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={editRow({ value })}>Editar</Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={editRow({ value })}>Reverter</Button>
                        </Grid>
                )
            },
        ],
        []
    )

    const data = dados

    // React.useMemo(() => makeData(100000), [])

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    )
}

export default OpetationTable
