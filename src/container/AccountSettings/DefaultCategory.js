import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import CircularSpinner from '../../component/CircularSpinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../store/actions';
import { makeDefaultCategory } from '../../store/actions/accountsettingAction';
import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  color: theme.palette.text.primary,
  fontWeight: '600',
  paddingTop: 20,
  marginLeft: 25,
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  '& div': {
    display: 'inline-block',
    margin: 25,
    width: 140,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    '& img': {
      width: 75,
      height: 75,
    },
  },
  '& .active': {
    background: theme.palette.primary.light,
    '& p': {
      opacity: 1,
    },
  },
}));

const TypoCateStyled = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  color: theme.palette.text.primary,
  opacity: 0.4,
  fontWeight: '600',
  marginTop: 6,
}));

const DefaultCategory = (props) => {
  const { user_id } = JSON.parse(localStorage.getItem('userData'));
  const { getCategories, makeDefaultCategory, enqueueSnackbar, error, loading, categories, default_cat,success_message } = props;

  const [defaultCategory, setDefaultCategory] = useState(default_cat);
  const makeDefault = (id) => {
    setDefaultCategory(id);
  };

  const changeDefaultcategory = () => {
    const dataTosend = { user_id, default_category: defaultCategory };
    makeDefaultCategory(dataTosend);
  };

  useEffect(() => {
    getCategories({ user_id });
  }, []);
  console.log(default_cat);

  useMemo(() => {
    default_cat && setDefaultCategory(default_cat);
  }, [default_cat]);

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  useMemo(() => {
    
    success_message && enqueueSnackbar(success_message, { variant: 'success' });
  }, [success_message]);
  return (
    <>
      <TypoStyled>Default Category</TypoStyled>
      <BoxStyled>
        {categories.map((item, i) => (
          // console.log(item)
          (item.is_message_center == 0)?
          <div key={i} onClick={() => makeDefault(item.id)} className={item.id == defaultCategory ? 'active' : null}>
            <img src={item.category_image} />
            <TypoCateStyled>{item.category_name}</TypoCateStyled>
          </div>:''
        ))}
      </BoxStyled>

      <Box style={{ textAlign: 'center', marginTop: 20, marginBottom: 30 }}>
        <Button variant="contained" color="primary" onClick={changeDefaultcategory} disabled={loading}>
          {loading && <CircularSpinner />}
          MAKE DEFAULT
        </Button>
      </Box>
    </>
  );
};

const mapStateToProps = ({ rymidr, account }) => {
  return {
    loading: account.loading,
    error: account.error,
    categories: rymidr.categories,
    default_cat: rymidr.default_cat,
    success_message: account.success_message

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (data) => dispatch(getCategories(data)),
    makeDefaultCategory: (data) => dispatch(makeDefaultCategory(data)),
  };
};

DefaultCategory.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getCategories: PropTypes.func.isRequired,
  makeDefaultCategory: PropTypes.func.isRequired,
  categories: PropTypes.any.isRequired,
  default_cat: PropTypes.any.isRequired,
  success_message: PropTypes.any.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(DefaultCategory));
