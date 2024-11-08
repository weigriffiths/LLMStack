from llmstack.common.blocks.data.store.vectorstore import Document
from llmstack.common.utils.splitter import CSVTextSplitter, SpacyTextSplitter
from llmstack.common.utils.text_extract import extract_text_elements


def extract_documents(
    file_data,
    content_key,
    mime_type,
    file_name,
    metadata,
    chunk_size=1500,
):
    docs = []
    elements = extract_text_elements(
        mime_type=mime_type,
        data=file_data,
        file_name=file_name,
    )
    file_content = "\n\n".join([str(el) for el in elements])

    if mime_type == "text/csv":
        docs = [
            Document(
                page_content_key=content_key,
                page_content=t,
                metadata=metadata,
            )
            for t in CSVTextSplitter(
                chunk_size=chunk_size,
                length_function=CSVTextSplitter.num_tokens_from_string_using_tiktoken,
            ).split_text(file_content)
        ]
    else:
        docs = [
            Document(
                page_content_key=content_key,
                page_content=t,
                metadata=metadata,
            )
            for t in SpacyTextSplitter(
                chunk_size=chunk_size,
            ).split_text(file_content)
        ]
    return docs


def create_source_document_asset(file, datasource_uuid, document_id):
    from llmstack.data.models import DataSourceEntryFiles

    if not file:
        return None

    file_obj = DataSourceEntryFiles.create_from_data_uri(
        file, ref_id=document_id, metadata={"datasource_uuid": datasource_uuid}
    )

    return f"objref://datasource_entries/{file_obj.uuid}"


def get_source_document_asset_by_objref(objref):
    from llmstack.data.models import DataSourceEntryFiles

    if not objref:
        return None
    asset = None
    try:
        category, uuid = objref.strip().split("//")[1].split("/")
        asset = DataSourceEntryFiles.get_asset_data_uri(DataSourceEntryFiles.objects.get(uuid=uuid), include_name=True)
    except Exception:
        pass

    return asset


def get_document_data_uri_from_objref(objref, datasource_uuid):
    from llmstack.data.models import DataSourceEntryFiles

    if not objref:
        return None
    asset = None
    try:
        _, uuid = objref.strip().split("//")[1].split("/")
        asset_obj = DataSourceEntryFiles.objects.get(uuid=uuid)

        if asset_obj.metadata.get("datasource_uuid") != datasource_uuid:
            return None

        asset = DataSourceEntryFiles.get_asset_data_uri(asset_obj, include_name=True)

    except Exception:
        pass

    return asset
