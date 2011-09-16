<?php
// Load the XSLT source
$xsl = new DOMDocument;
$xsl->load('CVtoXHTML_full.xsl');

// Configure the transformer
$proc = new XSLTProcessor;
$proc->importStyleSheet($xsl); // attach the xsl rules

// Load the XML source
$xml = new DOMDocument;
$xml->load('cv_v6.xml');

// Set the parameters and output the transformation
$proc->setParameter('', 'profilename', $_GET['profilename']);
$proc->setParameter('', 'inhibitdetailfor', $_GET['inhibitdetailfor']);
$proc->setParameter('', 'showprivatedetails', ((boolean) $_GET['showprivatedetails']) ? '1' : '0');
$proc->setParameter('', 'showgraph', ((boolean) $_GET['showgraph']) ? '1' : '0');
$proc->setParameter('', 'showskills', ((boolean) $_GET['showskills']) ? '1' : '0');
$proc->setParameter('', 'showotherexperiences', ((boolean) $_GET['showotherexperiences']) ? '1' : '0');
$proc->setParameter('', 'showpaid', ((boolean) $_GET['showpaid']) ? '1' : '0');
$proc->setParameter('', 'showunpaid', ((boolean) $_GET['showunpaid']) ? '1' : '0');
$proc->setParameter('', 'showopensource', ((boolean) $_GET['showopensource']) ? '1' : '0');
print $proc->transformToXML($xml) or die;

?>
