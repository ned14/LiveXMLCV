<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml" xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:xs="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dt="http://xsltsl.org/date-time"
    xmlns:mods="http://www.loc.gov/mods/v3"
    xmlns:dyn="http://exslt.org/dynamic"
    extension-element-prefixes="dyn"
    xs:schemaLocation="cv_v6.xsd" exclude-result-prefixes="xhtml xsl xs xsi dt mods" version="1.0">
    <xsl:output omit-xml-declaration="yes" method="xml" media-type="application/xhtml+xml"
        doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"
        doctype-public="-//W3C//DTD XHTML 1.1//EN" encoding="UTF-8" indent="yes"/>
    <xsl:include href="date-time.xsl"/>

    <xsl:param name="currentdate" select="curriculumvitae/revision/lastupdated"/>
    <xsl:param name="profilename" select="'allpossibledata'"/>
    <xsl:param name="inhibitdetailfor" select="''"/>
    <xsl:param name="showprivatedetails" select="true()"/>
    <xsl:param name="showgraph" select="true()"/>
    <xsl:param name="showskills" select="true()"/>
    <xsl:param name="showotherexperiences" select="true()"/>
    <xsl:param name="showpaid" select="true()"/>
    <xsl:param name="showunpaid" select="true()"/>
    <xsl:param name="showopensource" select="true()"/>
    
    <!-- This rigmarole is due to a lot of XSLT implementations being only able
        to take string type parameters i.e. no matter what you supply, they
        silently convert it into a string which borks the boolean logic :( -->
    <xsl:variable name="showprivatedetails_" select="$showprivatedetails='1'"/>
    <xsl:variable name="showgraph_" select="$showgraph='1'"/>
    <xsl:variable name="showskills_" select="$showskills='1'"/>
    <xsl:variable name="showotherexperiences_" select="$showotherexperiences='1'"/>
    <xsl:variable name="showpaid_" select="$showpaid='1'"/>
    <xsl:variable name="showunpaid_" select="$showunpaid='1'"/>
    <xsl:variable name="showopensource_" select="$showopensource='1'"/>
    
    <xsl:template name="daterange" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="start"/>
        <xsl:param name="end"/>
        <abbr class="dtstart" title="{$start}"><time datetime="{$start}" itemprop="startDate"><xsl:call-template name="dt:format-date-time">
                <xsl:with-param name="xsd-date-time" select="$start"/>
                <xsl:with-param name="format" select="'%b %Y'"/>
            </xsl:call-template></time></abbr><xsl:if test="substring($end, 1, 7)!=substring($start, 1, 7)"> &#8212; <xsl:choose>
            <xsl:when test="$end='unbounded'">present</xsl:when>
            <xsl:otherwise>
                <abbr class="dtend" title="{$end}"><time datetime="{$end}" itemprop="endDate">
                <xsl:call-template name="dt:format-date-time">
                    <xsl:with-param name="xsd-date-time" select="$end"/>
                    <xsl:with-param name="format" select="'%b %Y'"/>
                </xsl:call-template></time></abbr>
            </xsl:otherwise>
        </xsl:choose></xsl:if>
    </xsl:template>

    <xsl:template name="datelength" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="start"/>
        <xsl:param name="end"/>
        <xsl:variable name="end2">
            <xsl:choose>
                <xsl:when test="$end='unbounded'">
                    <xsl:value-of select="$currentdate"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$end"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        
        <xsl:variable name="startyear">
            <xsl:call-template name="dt:get-xsd-datetime-year">
                <xsl:with-param name="xsd-date-time" select="$start"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="endyear">
            <xsl:call-template name="dt:get-xsd-datetime-year">
                <xsl:with-param name="xsd-date-time" select="$end2"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="startmonth">
            <xsl:call-template name="dt:get-xsd-datetime-month">
                <xsl:with-param name="xsd-date-time" select="$start"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="endmonth">
            <xsl:call-template name="dt:get-xsd-datetime-month">
                <xsl:with-param name="xsd-date-time" select="$end2"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="diff"
            select="12*(number($endyear)-number($startyear))+number($endmonth)-number($startmonth)"/>
        <xsl:variable name="months" select="$diff mod 12"/>
        <xsl:variable name="years" select="($diff - $months) div 12"/>
        <xsl:if test="$years!=0">
        <xsl:value-of select="$years"/>&#160;<xsl:choose>
            <xsl:when test="$years=1">year</xsl:when>
            <xsl:otherwise>years</xsl:otherwise>
        </xsl:choose>
        </xsl:if>
        <xsl:if test="$months!=0"><xsl:if test="$years!=0">&#160;</xsl:if><xsl:value-of select="$months"/>&#160;<xsl:choose>
                <xsl:when test="$months=1">month</xsl:when>
                <xsl:otherwise>months</xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
    
    <xsl:key name="allemployers" match="experience[employer/text() and earnings/text()]/employer" use="."/>
    
    <xsl:template match="/curriculumvitae">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
            <head>
                <meta http-equiv="Content-Style-Type" content="text/css"/>
                <meta http-equiv="Content-Type" content="application/xhtml\+xml; charset=utf-8"/>
                <meta http-equiv="Content-Language" content="{@lang}"/>
                <title>Curriculum Vitae For <xsl:value-of select="@forwhom"/></title>
                <link rel="stylesheet" href="CVtoXHTML_short.css" type="text/css"/>
                <link rel="stylesheet" href="CVtoXHTMLprint_short.css" type="text/css" media="print"/>
                <xsl:comment><![CDATA[[if IE]>
                <link rel="stylesheet" href="CVtoXHTMLie_short.css" type="text/css" />
                <![endif]]]></xsl:comment>
            </head>
            <body class="hresume" itemscope="itemscope" itemtype="http://schema.org/WebPage">
                <xsl:apply-templates select="privatedetails"/>
                <xsl:apply-templates select="introduction"/>
                <xsl:apply-templates select="skills"/>
                <xsl:apply-templates select="qualifications"/>
                <xsl:apply-templates select="experiences"/>
                <xsl:apply-templates select="publications"/>
                    <div>
                        <h1 style="text-align:center">This is the two page resume format.<br/>
                            A fully detailed version can be found online at <a
                                href="http://www.nedprod.com/xmlcv/"
                                >http://www.nedprod.com/xmlcv/</a>.</h1>
                    </div>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="privatedetails" xmlns="http://www.w3.org/1999/xhtml">
        <table class="privatedetails vcard" id="privatedetails" itemprop="alumni" itemscope="itemscope"
            itemtype="http://schema.org/Person">
            <!-- Generate the alumniOf itemprops -->
            <xsl:attribute name="itemref">pi_qualifications pi_experiences<xsl:for-each select="//award"> eo_<xsl:value-of select="generate-id(.)"/></xsl:for-each>
            </xsl:attribute>
            <tr>
                <td class="name">
                    <span class="fn" itemprop="name">
                        <xsl:value-of select="../name"/>
                    </span>
                </td>
                <td/>
                <td class="email">
                    <xsl:choose>
                        <xsl:when test="$showprivatedetails_">
                            <span class="email" itemprop="email">
                                <a href="mailto:{email}">
                                    <xsl:value-of select="email"/>
                                </a>
                            </span>
                        </xsl:when>
                        <xsl:otherwise>xxxxxx@xxxxxxx.xxx</xsl:otherwise>
                    </xsl:choose>
                </td>
            </tr>
            <tr>
                <td class="address">
                    <xsl:choose>
                        <xsl:when test="$showprivatedetails_">
                            <div class="adr" itemprop="address" itemscope="itemscope"
                                itemtype="http://schema.org/PostalAddress">
                                <span class="street-address" itemprop="streetAddress">
                                    <xsl:apply-templates select="address"/>
                                </span>
                            </div>
                        </xsl:when>
                        <xsl:otherwise>xxxxxxxxxxxx<br/>xxxxxxxxxx<br/>xxxxxxxxxxx<br/>xxxxxxx</xsl:otherwise>
                    </xsl:choose>
                </td>
                <td class="telephone">
                    <xsl:choose>
                        <xsl:when test="$showprivatedetails_">
                            <span class="tel" itemprop="telephone">
                                <xsl:value-of select="telephone"/>
                            </span>
                        </xsl:when>
                        <xsl:otherwise>xxxx xx xxxxxxx</xsl:otherwise>
                    </xsl:choose>
                </td>
                <td class="dateofbirth">Date of Birth: <xsl:choose>
                        <xsl:when test="$showprivatedetails_">
                            <time datetime="{dateofbirth}" itemprop="birthDate">
                                <xsl:call-template name="dt:format-date-time">
                                    <xsl:with-param name="xsd-date-time" select="dateofbirth"/>
                                    <xsl:with-param name="format" select="'%d %b %Y'"/>
                                </xsl:call-template>
                            </time>
                        </xsl:when>
                        <xsl:otherwise>xxxx xxx xxxx</xsl:otherwise>
                    </xsl:choose>
                </td>
            </tr>
            <tr>
                <td class="version" colspan="2"/>
                <td class="profile">rev. <xsl:value-of select="../revision/version"/> (<xsl:value-of
                        select="../revision/lastupdated"/>) xmlprofile: '<xsl:value-of
                        select="$profilename"/>'</td>
            </tr>
        </table>
    </xsl:template>

    <!-- This is a handy workaround for all those stupid xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        you get all over the XHTML when copied using <xsl:copy-of>. We use the fairly unknown feature of
        binding templates to a certain scope (mode) to restrict processing to just XHTML -->
    <xsl:template match="xhtml:div">
        <xsl:apply-templates mode="xhtml"/>
    </xsl:template>
    <xsl:template match="*" mode="xhtml">
        <xsl:element name="{name()}" namespace="{namespace-uri()}">
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates mode="xhtml"/>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="introduction" xmlns="http://www.w3.org/1999/xhtml">
        <div class="introduction summary">
            <xsl:for-each select="specialize[@profile=$profilename]/short">
                <xsl:apply-templates select="xhtml:div"/>                
            </xsl:for-each>
        </div>
    </xsl:template>
    
    
    <xsl:template match="skills" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:if test="$showskills_">
            <div class="keeptogether">
                <div class="sectionheader">
                    <img class="sectionheader" alt="" src="sectionheader.png"/>
                    <h2 class="skills">Skills:</h2>
                </div>
                <xsl:if test="count(skillsgroup/skill/specificskill[@ability='expert'])">
                    <p><span class="skillability">Expert:</span>&#160;
                        <xsl:for-each select="skillsgroup/skill/specificskill[@ability='expert']">
                            <span class="skill"><xsl:value-of select="."/></span>
                            <xsl:if test="position()!=last()">, </xsl:if>
                            <xsl:if test="position()=last()">.</xsl:if>
                        </xsl:for-each>
                    </p>
                </xsl:if>
                <xsl:if test="count(skillsgroup/skill/specificskill[@ability='proficient'])">
                    <p><span class="skillability">Proficient:</span>&#160;
                        <xsl:for-each select="skillsgroup/skill/specificskill[@ability='proficient']">
                            <span class="skill"><xsl:value-of select="."/></span>
                            <xsl:if test="position()!=last()">, </xsl:if>
                            <xsl:if test="position()=last()">.</xsl:if>
                        </xsl:for-each>
                    </p>
                </xsl:if>
                <xsl:if test="count(skillsgroup/skill/specificskill[@ability='competent'])">
                    <p><span class="skillability">Competent:</span>&#160;
                        <xsl:for-each select="skillsgroup/skill/specificskill[@ability='competent']">
                            <span class="skill"><xsl:value-of select="."/></span>
                            <xsl:if test="position()!=last()">, </xsl:if>
                            <xsl:if test="position()=last()">.</xsl:if>
                        </xsl:for-each>
                    </p>
                </xsl:if>
                <xsl:if test="count(skillsgroup/skill/specificskill[@ability='beginner'])">
                    <p><span class="skillability">Beginner:</span>&#160;
                        <xsl:for-each select="skillsgroup/skill/specificskill[@ability='beginner']">
                            <span class="skill"><xsl:value-of select="."/></span>
                            <xsl:if test="position()!=last()">, </xsl:if>
                            <xsl:if test="position()=last()">.</xsl:if>
                        </xsl:for-each>
                    </p>
                </xsl:if>
                <xsl:if test="count(skillsgroup/skill/specificskill[@ability='novice'])">
                    <p><span class="skillability">Novice:</span>&#160;
                        <xsl:for-each select="skillsgroup/skill/specificskill[@ability='novice']">
                            <span class="skill"><xsl:value-of select="."/></span>
                            <xsl:if test="position()!=last()">, </xsl:if>
                            <xsl:if test="position()=last()">.</xsl:if>
                        </xsl:for-each>
                    </p>
                </xsl:if>
            </div>
        </xsl:if>
    </xsl:template>


    <xsl:template match="qualifications" xmlns="http://www.w3.org/1999/xhtml">
        <div class="keeptogether">
            <div class="sectionheader">
                <img class="sectionheader" alt="" src="sectionheader.png"/>
                <h2 class="qualifications">Qualifications:</h2>
                <span id="pi_qualifications" itemprop="performerIn" itemscope="itemscope" itemtype="http://schema.org/EducationEvent">
                    <xsl:attribute name="itemref">
                        <xsl:for-each select="award"> ev_<xsl:value-of select="generate-id(.)"/></xsl:for-each>
                    </xsl:attribute>
                    <meta itemprop="name" content="Qualifications"/>
                </span>
            </div>
            <xsl:if test="count(award[iscedcategory/iscedlevel='6'])">
                <p><span class="awardlevel">Postgraduate:</span>&#160; <xsl:for-each
                        select="award[iscedcategory/iscedlevel='6']">
                        <span class="award" id="ev_{generate-id(.)}" itemprop="subEvents"
                            itemscope="itemscope" itemtype="http://schema.org/EducationEvent"
                            itemref="eo_{generate-id(.)}"><span itemprop="name"><xsl:value-of select="name"/> in
                                <xsl:value-of select="title"/></span>, <span class="institution"
                                id="eo_{generate-id(.)}" itemprop="alumniOf location"
                                itemscope="itemscope"
                                itemtype="http://schema.org/EducationalOrganization"
                                itemref="privatedetails">
                                <span itemprop="name"><xsl:value-of select="institution"/></span>
                            </span> (<xsl:call-template name="daterange">
                                <xsl:with-param name="start" select="start"/>
                                <xsl:with-param name="end" select="end"/>
                            </xsl:call-template>)<xsl:if test="grade/text()">, <xsl:value-of
                                    select="grade"/></xsl:if></span>
                        <xsl:if test="position()!=last()">; </xsl:if>
                        <xsl:if test="position()=last()">.</xsl:if>
                    </xsl:for-each>
                </p>
            </xsl:if>
            <xsl:if test="count(award[iscedcategory/iscedlevel='5'])">
                <p><span class="awardlevel">Undergraduate:</span>&#160; <xsl:for-each
                    select="award[iscedcategory/iscedlevel='5']">
                    <span class="award" id="ev_{generate-id(.)}" itemprop="subEvents"
                        itemscope="itemscope" itemtype="http://schema.org/EducationEvent"
                        itemref="eo_{generate-id(.)}"><span itemprop="name"><xsl:value-of select="name"/> in
                            <xsl:value-of select="title"/></span>, <span class="institution"
                                id="eo_{generate-id(.)}" itemprop="alumniOf location"
                                itemscope="itemscope"
                                itemtype="http://schema.org/EducationalOrganization"
                                itemref="privatedetails">
                                <span itemprop="name"><xsl:value-of select="institution"/></span>
                            </span> (<xsl:call-template name="daterange">
                                <xsl:with-param name="start" select="start"/>
                                <xsl:with-param name="end" select="end"/>
                            </xsl:call-template>)<xsl:if test="grade/text()">, <xsl:value-of
                                select="grade"/></xsl:if></span>
                    <xsl:if test="position()!=last()">; </xsl:if>
                    <xsl:if test="position()=last()">.</xsl:if>
                </xsl:for-each>
                </p>
            </xsl:if>
            <xsl:if test="count(award[iscedcategory/iscedlevel='4'])">
                <p><span class="awardlevel">Further Education:</span>&#160;<xsl:for-each
                    select="award[iscedcategory/iscedlevel='4']">
                    <span class="award" id="ev_{generate-id(.)}" itemprop="subEvents"
                        itemscope="itemscope" itemtype="http://schema.org/EducationEvent"
                        itemref="eo_{generate-id(.)}"><span itemprop="name"><xsl:value-of select="name"/> in
                            <xsl:value-of select="title"/></span>, <span class="institution"
                                id="eo_{generate-id(.)}" itemprop="alumniOf location"
                                itemscope="itemscope"
                                itemtype="http://schema.org/EducationalOrganization"
                                itemref="privatedetails">
                                <span itemprop="name"><xsl:value-of select="institution"/></span>
                            </span> (<xsl:call-template name="daterange">
                                <xsl:with-param name="start" select="start"/>
                                <xsl:with-param name="end" select="end"/>
                            </xsl:call-template>)<xsl:if test="grade/text()">, <xsl:value-of
                                select="grade"/></xsl:if></span>
                    <xsl:if test="position()!=last()">; </xsl:if>
                    <xsl:if test="position()=last()">.</xsl:if>
                </xsl:for-each>
                </p>
            </xsl:if>
        </div>
    </xsl:template>

    <xsl:template name="outputemployer" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="experiences"/>
        <xsl:param name="datelength" select="1"/>
        <xsl:for-each select="$experiences"><xsl:sort select="employer"/>
                <xsl:value-of select="employer"/><xsl:if test="$datelength">&#160;(<xsl:call-template name="datelength">
                    <xsl:with-param name="start" select="start"/>
                    <xsl:with-param name="end" select="end"/>
                </xsl:call-template>)</xsl:if>
            <xsl:if test="position()!=last()">, </xsl:if>
            <xsl:if test="position()=last()">.</xsl:if>
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="outputtitle" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="experiences"/>
        <xsl:param name="datelength" select="1"/>
        <xsl:for-each select="$experiences"><xsl:sort select="title"/>
            <xsl:value-of select="title"/><xsl:if test="$datelength">&#160;(<xsl:call-template name="datelength">
                <xsl:with-param name="start" select="start"/>
                <xsl:with-param name="end" select="end"/>
            </xsl:call-template>)</xsl:if>
            <xsl:if test="position()!=last()">; </xsl:if>
            <xsl:if test="position()=last()">.</xsl:if>
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template name="outputexperiences" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="exclude" select="''"/>
        <xsl:param name="include" select="'*'"/>
        <xsl:variable name="myexperiences" select="experience[(($exclude='' or (contains(iscocategory/nacecode/text(), substring-before($exclude, ';'))!=true()
            and (substring-before(substring-after($exclude, ';'), ';')='' or contains(iscocategory/nacecode/text(), substring-before(substring-after($exclude, ';'), ';'))!=true())
            and (substring-before(substring-after(substring-after($exclude, ';'), ';'), ';')='' or contains(iscocategory/nacecode/text(), substring-before(substring-after(substring-after($exclude, ';'), ';'), ';'))!=true())))
            and ($include='*' or
            (substring-before($include, ';')!='' and contains(iscocategory/nacecode/text(), substring-before($include, ';'))=true())
            or (substring-before(substring-after($include, ';'), ';')!='' and contains(iscocategory/nacecode/text(), substring-before(substring-after($include, ';'), ';'))=true())
            or (substring-before(substring-after(substring-after($include, ';'), ';'), ';')!='' and contains(iscocategory/nacecode/text(), substring-before(substring-after(substring-after($include, ';'), ';'), ';'))=true())))]"/>
        <div class="experiences vcalendar">
            <xsl:variable name="myemployers" select="$myexperiences[employer/text() and earnings[@currency]]"/>
            <xsl:if test="$myemployers">
                <p><span class="pastemployers">Past Employers (permanent and
                        contract):</span>&#160;<xsl:call-template name="outputemployer">
                        <xsl:with-param name="experiences"
                            select="$myemployers[generate-id(employer) = generate-id(key('allemployers', employer)[1])]"/>
                        <xsl:with-param name="datelength" select="0"/>
                    </xsl:call-template>
                </p>
                <p><span class="pastprojects">Employed Roles:</span>&#160;<xsl:call-template name="outputtitle">
                    <xsl:with-param name="experiences"
                        select="$myemployers"/>
                    <xsl:with-param name="datelength" select="0"/>
                </xsl:call-template>
                </p>
            </xsl:if>
            <xsl:variable name="myopensource" select="$myexperiences[earnings='Open Source']"/>
            <xsl:if test="$myopensource">
                <p><span class="pastprojects">Open Source
                        contributions:</span>&#160;<xsl:call-template name="outputtitle">
                            <xsl:with-param name="experiences"
                            select="$myopensource"/>
                        <xsl:with-param name="datelength" select="0"/>
                    </xsl:call-template>
                </p>
            </xsl:if>
            <xsl:variable name="mycommittees" select="$myexperiences[employer/text() and earnings='Unpaid']"/>
            <xsl:if test="$mycommittees">
                <p><span class="pastprojects">Committees:</span>&#160;<xsl:call-template name="outputemployer">
                    <xsl:with-param name="experiences"
                        select="$mycommittees[generate-id(employer) = generate-id(key('allemployers', employer)[1])]"/>
                    </xsl:call-template>
                </p>
            </xsl:if>
        </div>
    </xsl:template>

    <xsl:template match="experiences" xmlns="http://www.w3.org/1999/xhtml">
        <div class="sectionheader">
            <img class="sectionheader" alt="" src="sectionheader.png"/>
            <h2 class="experiences">Relevant Experiences:</h2>
            <span id="pi_experiences" itemprop="performerIn" itemscope="itemscope" itemtype="http://schema.org/Event">
                <xsl:attribute name="itemref">
                    <xsl:for-each select="experience"> ev_<xsl:value-of select="generate-id(.)"/></xsl:for-each>
                </xsl:attribute>
                <meta itemprop="name" content="Experiences"/>
            </span>
        </div>
            <xsl:call-template name="outputexperiences">
                <xsl:with-param name="exclude" select="$inhibitdetailfor"/>
            </xsl:call-template>
        <xsl:choose>
            <xsl:when test="$showotherexperiences_">
                <xsl:if test="$inhibitdetailfor">
                    <div class="sectionheader">
                        <img class="sectionheader" alt="" src="sectionheader.png"/>
                        <h2 class="experiences">Other Experiences:</h2>
                    </div>
                    <xsl:call-template name="outputexperiences">
                        <xsl:with-param name="include" select="$inhibitdetailfor"/>
                    </xsl:call-template>
                </xsl:if>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="publications" xmlns="http://www.w3.org/1999/xhtml">
        <div class="keeptogether">
            <div class="sectionheader">
                <img class="sectionheader" alt="" src="sectionheader.png"/>
                <h2 class="publications">Publications:</h2>
            </div>
            <xsl:if test="count(mods:modsCollection/mods:mods[mods:genre='book'])">
                <p>
                    <span class="publicationlevel">Books:</span>&#160; <xsl:for-each
                        select="mods:modsCollection/mods:mods[mods:genre='book']">
                        <span class="book" id="bk_{generate-id(.)}" itemscope="itemscope"
                            itemtype="http://schema.org/Book">
                            <cite itemprop="name">
                                <xsl:value-of select="mods:titleInfo/mods:title"/>
                                <xsl:if test="mods:titleInfo/mods:subTitle">: <xsl:value-of
                                        select="mods:titleInfo/mods:subTitle"/></xsl:if>
                            </cite> (<time itemprop="datePublished"><xsl:value-of select="mods:originInfo/mods:dateIssued"/></time>),
                                <xsl:value-of select="mods:originInfo/mods:publisher"/><xsl:if
                                test="mods:identifier[@type='citekey']/text()">, Citation key:
                                    <xsl:value-of select="mods:identifier[@type='citekey']"
                                /></xsl:if><xsl:if test="mods:identifier[@type='isbn']/text()">,
                                ISBN: <xsl:value-of select="mods:identifier[@type='isbn']"
                                /></xsl:if>
                        </span>
                        <xsl:if test="position()!=last()">; </xsl:if>
                        <xsl:if test="position()=last()">.</xsl:if>
                    </xsl:for-each>
                </p>
            </xsl:if>
            <xsl:if test="count(mods:modsCollection/mods:mods[not(mods:genre)])">
                <p>
                    <span class="publicationlevel">Papers:</span>&#160; <xsl:for-each
                        select="mods:modsCollection/mods:mods[not(mods:genre)]">
                        <span class="paper" id="pr_{generate-id(.)}" itemscope="itemscope"
                            itemtype="http://schema.org/ScholaryArticle">
                            <cite itemprop="name">
                                <xsl:value-of select="mods:titleInfo/mods:title"/>
                                <xsl:if test="mods:titleInfo/mods:subTitle">: <xsl:value-of
                                    select="mods:titleInfo/mods:subTitle"/></xsl:if>
                            </cite> (<time itemprop="datePublished"><xsl:value-of select="mods:originInfo/mods:dateIssued"/></time>),
                            <xsl:value-of select="mods:originInfo/mods:publisher"/><xsl:if
                                test="mods:identifier[@type='citekey']/text()">, Citation key:
                                <xsl:value-of select="mods:identifier[@type='citekey']"
                                /></xsl:if><xsl:if test="mods:identifier[@type='isbn']/text()">,
                                    ISBN: <xsl:value-of select="mods:identifier[@type='isbn']"
                                    /></xsl:if>
                        </span>
                        <xsl:if test="position()!=last()">; </xsl:if>
                        <xsl:if test="position()=last()">.</xsl:if>
                    </xsl:for-each>
                </p>
            </xsl:if>
        </div>
    </xsl:template>
    
</xsl:stylesheet>
