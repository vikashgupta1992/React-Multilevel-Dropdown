import "./App.css";
import {useState} from "react";

const menuData = [
  {
    id: 1,
    label: "Menu 1"
  },
  {
    id: 2,
    label: "Menu 2",
    submenu: [{ id: 3, label: "Sub Menu 1" }, { id: 4, label: "Sub Menu 2" }],
  },
  {
    id: 5,
    label: "Menu 3",
    submenu: [
      { id: 6, label: "Sub Menu 1" },
      { id: 7, label: "Sub Menu 2" },
      { id: 8, label: "Sub Menu 3" },
      {
        id: 9, label: "Sub Menu 4",
        submenu: [
          {
            id: 10,
            label: "Sub sub menu 1",
          },
          { id: 11, label: "Sub sub menu 2" },
        ],
      },
    ],
  },
  {
    id: 12,
    label: "Menu 4",
    submenu: [{ id: 13, label: "Sub Menu 1" }, { id: 14, label: "Sub Menu 2" }],
  },
];

const styles = {
  menuItem: {
    position: 'relative',
    listStyle: 'none',
    marginBottom: '10px',
  },
  arrow: {
    display: 'inline-block',
    width: '1.5rem',
    marginLeft: '8px',
    fontSize: '12px',
  },
  submenu: {
    marginTop: '5px',
    marginLeft: '20px',
    listStyle: 'none',
  },
  btnStyle: {
    width: "300px",
    borderRadius: "10px",
    border: "1px solid gray",
    backgroundColor: "white",
    padding: "10px",
    marginTop: "2px"
  },
  submenuDropdown: {
    flexDirection: "column"
  },
  submenuDropdownParent: {
    padding: 0,
    margin: 0,
  }
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState({
    id: 0,
    item: ""
  });

  const toggleSubMenu = (e) => {
    e.stopPropagation();

    e.target.classList.toggle("active");
    let submenuId = e.target.getAttribute("data-key-id");
    if (!submenuId) return;

    const findSubmenu = document.querySelector(`.submenu_${submenuId}`);
    if (findSubmenu.style.display === "none" || !findSubmenu.style.display) {
      findSubmenu.style.display = "block";
      if (!findSubmenu.classList.contains('open')) {
        findSubmenu.classList.add("open");
      }
      findSubmenu.classList.remove("close");
    } else {
      findSubmenu.style.display = "none";
      if (!findSubmenu.classList.contains('close')) {
        findSubmenu.classList.add("close");
      }
      findSubmenu.classList.remove("open");
    }
  };

  const renderSubMenu = (subMenu, fieldId) => {
    return (
      <div className={`submenu submenu_${fieldId}`}>
        {subMenu.map((subItem) => (
            <div key={subItem.id} >
              <div className="menuItem" onClick={() => handleChange({id: subItem.id, item: subItem.label})}>
                <span style={styles.arrow} onClick={toggleSubMenu} data-key-id={subItem.id} className="arrow-item">{subItem.submenu ? '➤' : ''}</span>
                {subItem.label}
              </div>
              {subItem.submenu && renderSubMenu(subItem.submenu, subItem.id)}
            </div>
          ))}
      </div>
    );
  };

  const toggleDropDown = () => {
    setIsVisible(!isVisible);
  }

  const handleChange = (selectedData) => {
    setSelected(selectedData);
  }

  return (
      <>
          <div>
            <div style={styles.btnStyle} onClick={toggleDropDown}>{selected && selected.item ? selected.item : "Please Select"} </div>
            <div style={{ ...styles.btnStyle, ...styles.submenuDropdown, display: isVisible ? 'block' : 'none'}}>
              <div style={styles.submenuDropdownParent}>
                {menuData.map((item) => (
                    <div key={item.id} >
                      <div className="menuItem" onClick={() => handleChange({id: item.id, item: item.label})}>
                        <span style={styles.arrow} data-key-id={item.id} onClick={toggleSubMenu} className="arrow-item">{item.submenu ? '➤' : ''}</span>
                        {item.label}
                      </div>
                      {item.submenu && renderSubMenu(item.submenu, item.id)}
                    </div>
                ))}
              </div>
            </div>
        </div>
      </>
  );
}

export default App;
