import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ReactFormBuilder, ElementStore, ReactFormGenerator } from 'react-form-builder2';
import * as variables from '../../../src/variables';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component

export function MyDocument(props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {props.testData.data && props.testData.data.length > 0 ? (
            <ReactFormGenerator
              hide_actions={true}
              form_action="/"
              form_method="POST"
              variables={variables}
              data={props.testData.data}
              //answer_data={props.testData.form_data}
            />
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
