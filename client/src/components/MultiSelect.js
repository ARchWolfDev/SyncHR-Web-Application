import React from 'react'
import Select from 'react-select'

function MultiSelect({options = [], size='', preSelected = []}) {

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          height: size === 'sm'?"31px": provided.height, // Matching Bootstrap's small button height
          minHeight: size === 'sm'?"31px": provided.minHeight,
          borderRadius: "4px",
          borderColor: state.isFocused ? "#5E17EB" : '#dee2e6',
          boxShadow: state.isFocused
            ? "0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 3px 3px rgba(94, 23, 235, 0.4)"
            : provided.boxShadow,
          "&:hover": {
            borderColor: state.isFocused ? "#5E17EB" : '#dee2e6',
          },
          padding: size === 'sm'?"0px":provided.padding, // No extra padding
          display: "flex", // Aligns multiValue tags properly
          marginBottom: '1rem'
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: size === 'sm'?"0px 6px": provided.padding, // Adjust padding for input text and tags
          display: "flex",
          alignItems: "center",
          height: "100%",
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: "#e9e9e9",
          borderRadius: "2px",
          padding: size === 'sm'?"1px 4px":provided.padding, // Tight padding to fit the height
          margin: "0px 3px",
          alignItems: "center",
          display: "flex",
          height: size === 'sm'?"20px": provided.height, // Control height of tags
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          fontSize: size === 'sm'?"12px":provided.fontSize, // Small font size to fit within the tag
          padding: size === 'sm'?"0px 2px":provided.padding, // No extra padding
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          padding: size === 'sm'?"0px 4px":provided.padding, // Smaller padding for the close button
          height: "100%",
          display: "flex",
          alignItems: "center",
          '&:hover': {
            backgroundColor: "#d6d6d6",
            color: "black",
          },
        }),
        input: (provided) => ({
          ...provided,
          margin: "0px",
          padding: "0px",
          fontSize: "12px",
          height: size === 'sm'?"20px":provided.height, // Ensures input field aligns with selected tags
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          height: size === 'sm'?"31px":provided.height, // Align indicators with control height
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          padding: size === 'sm'?"4px":provided.padding, // Adjust padding to fit
        }),
        clearIndicator: (provided) => ({
          ...provided,
          padding: size === 'sm'?"4px":provided.padding,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#5E17EB" // Background when selected
              : state.isFocused
              ? "#d9c9f3" // Custom hover color
              : "white", // Default background color
            color: state.isSelected ? "white" : "black", // Text color
            padding: "8px 12px", // Option padding
            '&:hover': {
              backgroundColor: "#d9c9f3", // Custom hover color when hovering
              color: "black", // Hover text color
            },
        }),
      };

  return (
    <Select
        closeMenuOnSelect={false}
        isMulti
        defaultValue={preSelected}
        styles={customStyles}
        options={options}
        placeholder="Select options"
    />
  )
}

export default MultiSelect
