import React, { FC } from "react";
import { useRegionDropdown } from "./hooks/hookRegionDropdown";
import { NavDropdown } from "react-bootstrap";

export const RegionsDropdown: FC = () => {

  const { region, regions, handleChangeRegion } = useRegionDropdown();

  return (
    <NavDropdown id="region-list" title={region ? region.label : 'Выбрать регион'}>
      {regions.regions.map(regionItem => (
        <NavDropdown.Item
          key={regionItem.slug}
          className={regionItem.slug === region?.slug ? 'active' : ''}
          onClick={() => handleChangeRegion(regionItem)}
        >{regionItem.label}</NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}