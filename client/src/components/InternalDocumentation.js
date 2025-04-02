import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // import the snow theme CSS
// import 'react-quill/dist/quill.bubble.css'; // for bubble theme (optional)
// import Quill from 'quill';
// import TableUI from 'quill-table-ui';
// import 'quill-table-ui/dist/quill-table-ui.css';
// Quill.register({
//     'modules/tableUI': TableUI,
// });

const initialDocsTree = [
    {
        id: "DOC-1000",
        name: "Introduction",
        content: "This is the introduction to our documentation.",
        children: [],
    },
    {
        id: "DOC-1001",
        name: "Getting Started",
        content: "Here’s how to get started with our platform.",
        children: [
            { id: "DOC-1100", name: "Installation", content: "Follow these steps to install.", children: [] },
            { id: "DOC-1200", name: "Basic Usage", content: "Learn how to use the basics.", children: [] },
        ],
    },
];

const TreeNode = ({ node, onSelect, onAdd, onDelete, selectedId, expandedNodes, setExpandedNodes }) => {
    const isExpanded = expandedNodes[node.id] || false;

    const handleToggleExpand = () => {
        setExpandedNodes(prevState => ({
            ...prevState,
            [node.id]: !isExpanded // Toggle expansion state for this node
        }));
    };

    return (
        <div className='doc-node'>
            <div onClick={handleToggleExpand} className='node'>
                {node.children.length > 0 ? (
                    isExpanded ? 
                        <i className="fa-solid fa-angle-up fa-rotate-180" style={{ marginRight: 10 }}></i> :
                        <i className="fa-solid fa-angle-up fa-rotate-90" style={{ marginRight: 10 }}></i>
                ) : (
                    <i className="fa-regular fa-circle-dot fa-2xs" style={{ marginRight: 10, marginLeft: 2 }}></i>
                )}
                <span 
                    onClick={() => onSelect(node)}
                    style={selectedId === node.id ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                >
                    {node.name}
                </span>
                <div className='add-delete-buttons'>
                    <i type='button' onClick={() => onAdd(node)} style={{ marginRight: "10px" }} className="fa-solid fa-plus"></i>
                    <i type='button' onClick={() => onDelete(node.id)} className="fa-solid fa-trash delete"></i>
                </div>
            </div>

            {isExpanded && node.children.length > 0 &&
                node.children.map((child) => (
                    <TreeNode 
                        key={child.id} 
                        node={child} 
                        onSelect={onSelect} 
                        onAdd={onAdd} 
                        onDelete={onDelete} 
                        selectedId={selectedId} 
                        expandedNodes={expandedNodes}
                        setExpandedNodes={setExpandedNodes}
                    />
                ))
            }
        </div>
    );
};

const findNodeAndAncestors = (nodes, id, ancestors = []) => {
    for (const node of nodes) {
        if (node.id === id) {
            return { node, ancestors };
        }
        const found = findNodeAndAncestors(node.children, id, [...ancestors, node]);
        if (found) {
            return found;
        }
    }
    return null;
};

function InternalDocumentation() {
    const [docsTree, setDocsTree] = useState(initialDocsTree);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingContent, setEditingContent] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState({});
    const navigate = useNavigate();
    const { docId } = useParams();

    console.log(selectedDoc)

    const findNodeById = (nodes, id) => {
        for (const node of nodes) {
            if (node.id === id) return { node, parent: null };
    
            // Search recursively in children
            for (const child of node.children) {
                const found = findNodeById(child.children, id);
                if (found) {
                    return { node: found.node, parent: node };  // Return the node and its parent
                }
            }
        }
        return null;  // If the node was not found
    };

    useEffect(() => {
        if (!docId) {
            navigate(`/documentation/${docsTree[0].id}`, { replace: true });
        } else {
            const found = findNodeAndAncestors(docsTree, docId);
            if (found) {
                const { node, ancestors } = found;
                setSelectedDoc(node);
    
                // Expand all ancestor nodes
                setExpandedNodes(prevExpanded => {
                    const newExpanded = { ...prevExpanded };
                    ancestors.forEach(ancestor => {
                        newExpanded[ancestor.id] = true;
                    });
                    return newExpanded;
                });
            }
        }
    }, [docId, navigate, docsTree]);
    
    
    
    

    const handleSelectDoc = (doc) => {
    // Update the selected document state
    setSelectedDoc(doc);
    // Update the URL to reflect the selected document
    navigate(`/documentation/${doc.id}`, { replace: true });
};

    const updateTree = (updatedNode) => {
        const updateNode = (nodes) =>
            nodes.map((node) => 
                node.id === updatedNode.id ? updatedNode : { ...node, children: updateNode(node.children) }
            );

        setDocsTree(updateNode(docsTree));
        setEditingContent(false)
    };

    const handleTitleEdit = () => {
        updateTree(selectedDoc);
        setEditingTitle(false);
    };

    const handleContentEdit = () => {
        updateTree(selectedDoc);
        setEditingContent(false);
    };

    const handleAdd = (parentNode) => {
        const newName = prompt("Enter new section name:");
        if (newName) {
            const newNode = { id: Date.now().toString(), name: newName, content: "New content", children: [] };
            const newTree = [...docsTree];

            const addNode = (nodes) => {
                return nodes.map((node) => {
                    if (node.id === parentNode.id) {
                        return { ...node, children: [...node.children, newNode] };
                    }
                    return { ...node, children: addNode(node.children) };
                });
            };

            setDocsTree(addNode(newTree));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this section?")) {
            const deleteNode = (nodes) =>
                nodes.filter((node) => node.id !== id).map((node) => ({
                    ...node,
                    children: deleteNode(node.children),
                }));

            setDocsTree(deleteNode(docsTree));

            if (selectedDoc && selectedDoc.id === id) {
                setSelectedDoc(docsTree[0]);  // Reset selection
            }
        }
    };

    return (
        <Row>
            <Col className='col'>
                {selectedDoc && (
                    <>
                        <Row>
                            {editingTitle ? (
                                <input
                                    type='text'
                                    value={selectedDoc.name}
                                    autoFocus
                                    onChange={(e) => setSelectedDoc({ ...selectedDoc, name: e.target.value })}
                                    onBlur={handleTitleEdit}
                                />
                            ) : (
                                <h2>
                                    {selectedDoc.name}{" "}
                                    <span onClick={() => setEditingTitle(true)} style={{ cursor: 'pointer' }}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </span>
                                </h2>
                            )}
                        </Row>
                        <Row>
                            {editingContent ? (
                                <></>
                            ) : (
                                <p>
                                    {selectedDoc.content}{" "}
                                    <span onClick={() => setEditingContent(true)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </span>
                                </p>
                            )}
                        </Row>
                        <Row>
                            
                        </Row>
                    </>
                )}
            </Col>
            <Col className='box col-3'>
                <h6>Page Tree</h6>
                {docsTree.map((node) => (
                    <TreeNode 
                        key={node.id} 
                        node={node} 
                        onSelect={handleSelectDoc} 
                        onAdd={handleAdd} 
                        onDelete={handleDelete} 
                        selectedId={selectedDoc ? selectedDoc.id : null} 
                        expandedNodes={expandedNodes}
                        setExpandedNodes={setExpandedNodes}
                    />
                ))}
            </Col>
            <Button variant="primary" onClick={() => { updateTree(selectedDoc); alert('Changes Saved!'); }} style={{ marginTop: "10px" }}>
          Save Changes
        </Button>
        </Row>
    );
}

export default InternalDocumentation;
