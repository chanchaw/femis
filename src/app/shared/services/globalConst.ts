import { MetaFieldMap } from './model';

// oFieldName 表示DB 中字段名称，tFieldName 是前端 tablestyle.service 中 TableStyle 属性名称
export const TABLESTYLE2DXDATAGRIDCOLUMN:MetaFieldMap[] = [
    {oFieldName:'fieldname',tFieldName:'dataField'},
    {oFieldName:'caption',tFieldName:'caption'},
    {oFieldName:'colwidth',tFieldName:'width'},
    {oFieldName:'fixed',tFieldName:'fixed'},
    {oFieldName:'alignment',tFieldName:'alignment'},
    {oFieldName:'visible',tFieldName:'visible'},
    {oFieldName:'datatype',tFieldName:'dataType'}
]

export const BILLTYPE_FABRICORDER = "fabricOrder";