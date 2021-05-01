# SQLSERVER命令记录
查询最近执行过的命令记录：
```sql
SELECT creation_time, text FROM 
    sys.dm_exec_query_stats QS
CROSS APPLY
    sys.dm_exec_sql_text(QS.sql_handle) ST
```

可以发现SP_HELP命令实际上相当于执行了下面的语句：

```sql
(
    @_msparam_0 nvarchar(4000),
    @_msparam_1 nvarchar(4000)
)
SELECT param.parameter_id AS [ID],
    param.name AS [Name],
    usrt.name AS [DataType],
    ISNULL(baset.name, N'') AS [SystemType],
    CAST(
        CASE
            WHEN baset.name IN (N'nchar', N'nvarchar')
            AND param.max_length <> -1 THEN param.max_length / 2
            ELSE param.max_length
        END AS int
    ) AS [Length],
    CAST(param.precision AS int) AS [NumericPrecision],
    CAST(param.scale AS int) AS [NumericScale],
    ISNULL(xscparam.name, N'') AS [XmlSchemaNamespace],
    ISNULL(s2param.name, N'') AS [XmlSchemaNamespaceSchema],
    ISNULL(
        (
            case
                param.is_xml_document
                when 1 then 2
                else 1
            end
        ),
        0
    ) AS [XmlDocumentConstraint],
    s1param.name AS [DataTypeSchema]
FROM sys.all_objects AS udf
    INNER JOIN sys.all_parameters AS param ON (param.is_output = 0)
    AND (param.object_id = udf.object_id)
    LEFT OUTER JOIN sys.types AS usrt ON usrt.user_type_id = param.user_type_id
    LEFT OUTER JOIN sys.types AS baset ON (
        baset.user_type_id = param.system_type_id
        and baset.user_type_id = baset.system_type_id
    )
    or (
        (baset.system_type_id = param.system_type_id)
        and (baset.user_type_id = param.user_type_id)
        and (baset.is_user_defined = 0)
        and (baset.is_assembly_type = 1)
    )
    LEFT OUTER JOIN sys.xml_schema_collections AS xscparam ON xscparam.xml_collection_id = param.xml_collection_id
    LEFT OUTER JOIN sys.schemas AS s2param ON s2param.schema_id = xscparam.schema_id
    LEFT OUTER JOIN sys.schemas AS s1param ON s1param.schema_id = usrt.schema_id
WHERE (udf.type in ('TF', 'FN', 'IF', 'FS', 'FT'))
    and(
        udf.name = @_msparam_0
        and SCHEMA_NAME(udf.schema_id) = @_msparam_1
    )
ORDER BY [ID] ASC
```