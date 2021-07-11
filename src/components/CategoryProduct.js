import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CategoryHelper } from "../api/CategoryHelper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

export default function CategoryProduct() {
  const history = useHistory();
  const { name } = useParams();
  const [categoryInfo, setCategoryInto] = useState({});

  useEffect(() => {
    if (!name) {
      history.push("/category");
      return;
    }
    CategoryHelper.getAuction(name)
      .then((response) => {
        setCategoryInto(response.data);
      })
      .catch((err) => {
        setCategoryInto({
          message:
            err.response.status === 404
              ? "Category not found "
              : "Internal server error",
        });
      });
  }, []);

  return (
    <article>
      {categoryInfo ? (
        <div>
          {categoryInfo.message ? (
            <div>
              <h1>{categoryInfo.message}</h1>
            </div>
          ) : categoryInfo.data ? (
            <div>
              <Card>
                <CardHeader title={categoryInfo.data.productName} />
                <img
                  src={categoryInfo.data.productImage}
                  alt={categoryInfo.data.productName}
                />
              </Card>
            </div>
          ) : (
            []
          )}
        </div>
      ) : (
        []
      )}
    </article>
  );
}
