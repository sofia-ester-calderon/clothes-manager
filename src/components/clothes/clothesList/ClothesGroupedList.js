import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import styles from "./ClothesList.module.css";
import upArrow from "../../../assets/img/up-arrow.png";
import downArrow from "../../../assets/img/down-arrow.png";
import ColorCircle from "../../common/specialForms/ColorCircle";
import Rating from "../../common/specialForms/Rating";
import IconButton from "../../common/buttons/IconButton";
import deleteIcon from "../../../assets/img/trash.png";
import editIcon from "../../../assets/img/edit.png";
import { Link } from "react-router-dom";
import { AllColorsContext } from "../../../hooks/AllColorsProvider";

const ClothesGroupedList = ({
  header,
  clothes,
  display,
  onClickHeader,
  onDelete,
}) => {
  const colors = useContext(AllColorsContext);

  const headerStyle = ["thead-light"];
  if (clothes.length > 0) {
    headerStyle.push(styles.groupHeader);
  }

  function getHeaderStyle() {
    const headerStyle = ["thead-light"];
    if (clothes.length > 0) {
      headerStyle.push(styles.groupHeader);
    }
    return headerStyle.join(" ");
  }

  function getHeaderTitle() {
    let headerTitle = header;
    if (clothes.length > 0) headerTitle += ` (${clothes.length})`;
    return headerTitle;
  }

  function sortClothes() {
    function compare(a, b) {
      const typeA = a.type.toUpperCase();
      const typeB = b.type.toUpperCase();
      let comparison = 0;
      if (typeA > typeB) {
        comparison = 1;
      } else if (typeA < typeB) {
        comparison = -1;
      }
      return comparison;
    }
    return clothes.sort(compare);
  }

  return (
    <>
      {colors.length > 0 && (
        <table className="table">
          <thead className={getHeaderStyle()} onClick={onClickHeader}>
            <tr>
              <th colSpan="5">{getHeaderTitle()}</th>
              <th className={styles.arrow}>
                {clothes.length > 0 && (
                  <img
                    className={styles.arrowImg}
                    src={display ? upArrow : downArrow}
                    alt={display ? "Collapse" : "Show"}
                  />
                )}
              </th>
            </tr>
          </thead>
          {display ? (
            <tbody>
              {sortClothes().map((clothing) => (
                <tr key={clothing.id}>
                  <td className={styles.cellWidth}>{clothing.type}</td>
                  <td className={styles.cellWidth}>
                    {clothing.colors.map((colorId) => (
                      <ColorCircle
                        color={colors.find((color) => {
                          console.log("colors in find", colors);
                          console.log("colorId", colorId);
                          return color.id === colorId;
                        })}
                        key={colorId}
                      />
                    ))}
                  </td>
                  <td className={styles.cellWidth}>{clothing.occasion}</td>
                  <td className={styles.cellWidth}>
                    <Rating rating={clothing.rating} size="small" />
                  </td>
                  <td className={styles.iconCellWidth}>
                    <IconButton
                      onClick={() => onDelete(clothing.id)}
                      icon={deleteIcon}
                      altText="Delete"
                    />
                  </td>
                  <td className={styles.iconCellWidth}>
                    <Link to={"/clothing/" + clothing.id}>
                      <IconButton icon={editIcon} altText="Edit" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      )}
    </>
  );
};

ClothesGroupedList.propTypes = {
  header: PropTypes.string.isRequired,
  clothes: PropTypes.array.isRequired,
  colors: PropTypes.array,
  display: PropTypes.bool.isRequired,
  onClickHeader: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ClothesGroupedList;
