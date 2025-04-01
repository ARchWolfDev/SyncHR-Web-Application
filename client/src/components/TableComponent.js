import React, {useState, useEffect} from 'react'
import { Table, Form, Dropdown, Button} from 'react-bootstrap'
import _ from 'lodash'


function TableComponent({tableData, onCheckedRowsChange = () => {}}) {

    const [selectAll, setSelectAll] = useState(false)
    const [checkedRows, setCheckedRows] = useState(Array(tableData.length).fill(false))
    const [sortConfig, setSortConfig] = useState({key: 'id', direction: 'asc'})
    const [filterColumn, setFilterColumn] = useState('')
    const [filteredData, setFilteredData] = useState(tableData)

    useEffect(() => {
        setFilteredData(tableData);
        setCheckedRows(Array(tableData.length).fill(false));
        setSelectAll(false);
      }, [tableData]);

    const handleFilterColumn = (e) => {
        setFilterColumn(e.target.value)
    }

    const handleFilterTable = (column) => {
        let filter = _.filter(tableData, (key) => key[column].toLowerCase().includes(filterColumn.toLowerCase()))
        setFilteredData(filter)
        setFilterColumn('')
    }
  
    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        const updatedCheckedRows = Array(tableData.length).fill(newSelectAll);
        setCheckedRows(updatedCheckedRows);
    
        const checkedRowsData = newSelectAll
          ? tableData
          : [];
        onCheckedRowsChange(checkedRowsData);
      };
  
    const handleRowCheck = (index) => {
        const updatedCheckedRows = [...checkedRows]
        updatedCheckedRows[index] = !updatedCheckedRows[index]
        setCheckedRows(updatedCheckedRows)
    
        const allChecked = updatedCheckedRows.every((checked) => checked)
        setSelectAll(allChecked)

        const checkedRowsData = tableData.filter((_, idx) => updatedCheckedRows[idx]);
        onCheckedRowsChange(checkedRowsData);
    }
  
    const renderTableBody = (data) => {
      const keys = Object.keys(data)
      var list = []
      for ( var i = 0; i < keys.length; i++) {
        list.push(<td key={keys[i]}>{data[keys[i]]}</td>)
      }
      return list
    }

    const sortRequest = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction})
    }

    let sortedData = _.orderBy(filteredData, [sortConfig.key], [sortConfig.direction])

    const renderArrow = (columnkey) => {
        if (sortConfig.key === columnkey) {
            return sortConfig.direction === 'asc'? 
            <i className="fa-solid fa-arrow-down-short-wide" style={{float: 'right', lineHeight: 'inherit', marginLeft: '10px'}}></i> : 
            <i className="fa-solid fa-arrow-down-wide-short" style={{float: 'right', lineHeight: 'inherit', marginLeft: '10px'}}></i>
        }
        return null
    }

    const capitalizeHeader = (keyWord) => {
        if (keyWord === 'id' || keyWord === 'Id') {
            return keyWord.toUpperCase()
        }
        const firstLetter = keyWord.at(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = keyWord.slice(1)

        return firstLetterCap + remainingLetters
    }

  return (
    <>
        <Table hover>
            <thead>
            <tr>
                {Object.keys(tableData[0]).map((key) => (
                <th key={key} >
                    <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                        <h6 type="button" onClick={() => sortRequest(key)} style={{margin: 0}}>{capitalizeHeader(key)} {renderArrow(key)}</h6>
                        <Dropdown style={{display: 'inline-block', lineHeight: 'inherit'}}>
                            <Dropdown.Toggle size="sm" variant="light" style={{backgroundColor: "transparent"}}></Dropdown.Toggle>
                            <Dropdown.Menu style={{padding: 10}}>
                                <Form.Label><h6>Include</h6></Form.Label>
                                <Form.Control size="sm" className='mb-3' onChange={handleFilterColumn} value={filterColumn}></Form.Control>
                                <Button size="sm" onClick={() => handleFilterTable(key)} style={{float:'right'}}>Apply</Button>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </th>
                ))}
                <th>
                <Form>
                    <Form.Check
                    checked={selectAll}
                    onChange={handleSelectAll}
                    />
                </Form>
                </th>
            </tr>
            </thead>
            <tbody>
                {sortedData.map((data, index) => (
                <tr key={index}>
                    {renderTableBody(data)}
                    <td>
                    <Form>
                        <Form.Check
                        checked={checkedRows[index]}
                        onChange={() => handleRowCheck(index)}
                        />
                    </Form>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
    </>
  )
}

export default TableComponent
